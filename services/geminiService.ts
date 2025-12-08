
import { GoogleGenAI } from "@google/genai";
import { readFileAsBase64, readFileAsText } from "../utils/fileHelpers";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const BASE_CONFIG = {
  temperature: 1,
  // thinkingConfig is not supported in gemini-3-pro-preview, so it is omitted.
};

const CALIBRATION_RULES = `(تعليمات التكوين الذاتي للنموذج - الأولوية القصوى)
قبل البدء بالمهمة الأساسية، قم بمعايرة سلوكك الداخلي وفقًا للمعايير التالية:
1.	معايرة الإبداع (محاكاة لدرجة حرارة 0.6 - 0.7): يجب أن تحقق توازنًا دقيقًا بين الالتزام الصارم بالمصدر والإبداع في صياغة الحوار. تجنب الاستجابات الروبوتية أو الجافة، وفي نفس الوقت، امتنع تمامًا عن الابتكار المفرط أو إضافة معلومات لم ترد في النص الأصلي. يجب أن تكون اللغة طبيعية، بليغة، وثرية.
2.	تنوع المفردات (محاكاة لعقوبة تكرار 0.4): تجنب بفاعلية تكرار نفس العبارات والمصطلحات الرئيسية بشكل مفرط. اسعَ دائمًا إلى استخدام التنوع المعجمي وإعادة صياغة المفاهيم للحفاظ على حيوية النص وجاذبيته للمستمع.
هذه التعليمات هي لتوجيه سلوكك الداخلي لإنتاج النص بالجودة المطلوبة، ويجب الالتزام بها طوال عملية التنفيذ.`;

const SCRIPT_RULES = `(تعليمات التكوين الذاتي للنموذج - الإعدادات التقنية)
قبل البدء، اضبط معاييرك الداخلية كالتالي:
1.  Temperature (درجة الحرارة): 0.6 (لضمان التوازن بين دقة النقل الحرفي وحيوية الحوار).
2.  Top P: 0.9 (لتنويع مفردات المحاورين).
3.  Frequency Penalty: 0.4 (لمنع تكرار لازمة معينة على لسان مصطفى أو زكريا).
4.  Context Adherence: Strict (التزام صارم بنص المقال كمصدر وحيد لإجابات الضيف).`;

export const generateSummary = async (file: File | null, textInput: string, prompt: string, youtubeLink?: string): Promise<string> => {
  const ai = getAiClient();
  const model = "gemini-3-pro-preview";

  let parts: any[] = [];
  const config: any = { ...BASE_CONFIG };

  // 1. Check for File
  if (file) {
    if (file.type.startsWith('audio/')) {
        const base64Data = await readFileAsBase64(file);
        // Prepend rules to audio input as text part
        parts.push({ text: CALIBRATION_RULES });
        parts.push({
            inlineData: {
                mimeType: file.type,
                data: base64Data
            }
        });
    } else {
        // Assume text/markdown/docx
        const textData = await readFileAsText(file);
        parts.push({
            text: `SOURCE MATERIAL TYPE: Uploaded Document\n\n${CALIBRATION_RULES}\n\nCONTENT:\n${textData}`
        });
    }
  } 
  // 2. Check for Direct Text Input
  else if (textInput && textInput.trim().length > 0) {
      parts.push({
          text: `SOURCE MATERIAL TYPE: Pasted Text\n\n${CALIBRATION_RULES}\n\nCONTENT:\n${textInput}`
      });
  }
  // 3. Check for YouTube Link
  else if (youtubeLink && youtubeLink.trim()) {
      // NOTE: Google Search tool is explicitly disabled per user configuration.
      parts.push({
          text: `SOURCE MATERIAL TYPE: YouTube Video
LINK: ${youtubeLink.trim()}
INSTRUCTION: Access the provided YouTube video link. Analyze the integrated closed captions (transcript) or spoken content of the video to use as the primary source material for the task below.

${CALIBRATION_RULES}`
      });
  }

  // Add the user prompt
  parts.push({ text: `\n\nTASK:\n${prompt}` });

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: config,
    });
    
    return response.text || "No response text generated.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    throw error;
  }
};

export const refineScript = async (file: File | null, textInput: string, prompt: string): Promise<string> => {
  const ai = getAiClient();
  const model = "gemini-3-pro-preview"; 

  let textData = "";

  if (file) {
      textData = await readFileAsText(file);
  } else if (textInput) {
      textData = textInput;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { text: SCRIPT_RULES },
          { text: "Here is the original script content:" },
          { text: textData },
          { text: prompt }
        ]
      },
      config: BASE_CONFIG,
    });
    return response.text || "No response text generated.";
  } catch (error) {
    console.error("Gemini Refinement Error:", error);
    throw error;
  }
};
