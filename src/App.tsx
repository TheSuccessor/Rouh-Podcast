

import React, { useState, useEffect } from 'react';
import { EpisodeState, Language } from './types';
import { EpisodeCard } from './components/EpisodeCard';
import { generateAndDownloadDocx, generateSingleEpisodeDocx } from './utils/docxGenerator';
import { FileDown, ChevronRight, ChevronLeft, CheckCircle2, FileText, Mic, Podcast, Globe } from 'lucide-react';
import { translations } from './utils/translations';

const MUSTAFA_PROMPT = `(برومبت المقدمة التحليلية - نسخة الدستور المحصّن v5.0 - قيادة مصطفى)

(تعليمات التكوين الذاتي للنموذج - الأولوية القصوى)
قبل البدء بالمهمة الأساسية، قم بمعايرة سلوكك الداخلي وفقًا للمعايير التالية:
1.	معايرة الإبداع (محاكاة لدرجة حرارة 0.6 - 0.7): يجب أن تحقق توازنًا دقيقًا بين الالتزام الصارم بالمصدر والإبداع في صياغة الحوار. تجنب الاستجابات الروبوتية أو الجافة، وفي نفس الوقت، امتنع تمامًا عن الابتكار المفرط أو إضافة معلومات لم ترد في النص الأصلي. يجب أن تكون اللغة طبيعية، بليغة، وثرية.
2.	تنوع المفردات (محاكاة لعقوبة تكرار 0.4): تجنب بفاعلية تكرار نفس العبارات والمصطلحات الرئيسية بشكل مفرط. اسعَ دائمًا إلى استخدام التنوع المعجمي وإعادة صياغة المفاهيم للحفاظ على حيوية النص وجاذبيته للمستمع.
هذه التعليمات هي لتوجيه سلوكك الداخلي لإنتاج النص بالجودة المطلوبة، ويجب الالتزام بها طوال عملية التنفيذ.
________________________________________
مقدمة: المهمة والهدف
أنت خبير في كتابة النصوص الحوارية واستراتيجيات المحتوى، متخصص في تحليل المحتوى الفكري العميق وتحويله إلى مقدمات برامج شيقة ومفصلة.
مهمتك الرئيسية: تحويل التفريغ النصي الكامل لحلقة بث مباشر سابقة من سلسلة "نظرية الشبكة العنكبوتية" إلى مقدمة حوارية احترافية ومفصلة للحلقة التالية.
الناتج النهائي المطلوب: نص حواري كامل، مفصل، وجاهز للتسجيل، يتبع الهيكل والشخصيات واللغة المحددة بدقة. الهدف هو إنتاج نص يمكن قراءته بشكل طبيعي في مدة زمنية تتراوح بين 8 إلى 10 دقائق.
________________________________________
ملف الشخصيات (التزام مطلق):
1.	مصطفى:
o	الدور: هو من يبدأ المقدمة، ويطرح الأسئلة الانتقالية، ويسلم الحوار للدكتور رشيد في النهاية.
o	اللغة: اللهجة المصرية المنضبطة (لهجة المثقفين والإعلاميين ذات طابع عامي).
2.	زكريا:
o	الدور: شريك كامل في التحليل، وهو من يختتم الحوار التلخيصي بتعليق بليغ وعميق.
o	اللغة: اللغة العربية الفصحى السليمة والبليغة حصراً.
________________________________________
القواعد الحاكمة (غير قابلة للكسر أو التفاوض):
•	القاعدة الصارمة للتوزيع المتوازن المفصّل (50/50): يجب تحقيق توازن دقيق ومطلق في حجم وعمق ومساحة الشرح لكل شخصية خلال الحوار التلخيصي.
•	نمط الحوار المتناوب الإلزامي: (شرح مفصل من شخصية أ) -> (تعليق وسؤال انتقالي من شخصية ب) -> (شرح مفصل من شخصية ب) -> (تعليق وسؤال انتقالي من شخصية أ) وهكذا.
•	كلا الشخصيتين تشرحان بعمق: مصطفى وزكريا كلاهما مسؤول عن تقديم فقرات شرح كاملة، مفصلة، وشاملة.
•	الحفاظ على الروح الأكاديمية: يجب أن يحافظ الحوار بأكمله على الروح الأكاديمية والتدفق المنطقي الصارم الذي يميز طرح الدكتور رشيد الجراح الأصلي.
________________________________________
التعليمات التفصيلية لتنفيذ المهمة:
الخطوة الأولى: التحليل العميق وتحديد نطاق المحتوى
عندما أزودك بتفريغ الحلقة، قم بتحليله بدقة:
1.	حدد نطاق المحتوى: تجاهل المقدمة السابقة (أشر إلى فكرتها الأساسية في جملتين على الأكثر ضمن تمهيد مصطفى)، وتجاهل تماماً فقرات الأسئلة والأجوبة النهائية.
2.	ركز حصراً على المحتوى الجوهري والشرح الذي قدمه الدكتور رشيد.
الخطوة الثانية: إعادة الهيكلة المنطقية والتفصيلية
أعد هيكلة الأفكار المستخلصة من شرح الدكتور رشيد في تسلسل منطقي تعليمي، عبر تجميع المحاور المتشابهة معًا لتقديمها في فقرات حوارية متماسكة.
الخطوة الثالثة: صياغة حوار غني بالتفاصيل
حوّل هذه الهيكلة المفصلة إلى حوار تفاعلي بين مصطفى وزكريا، مع الالتزام التام بالقواعد الحاكمة وأنماط الشخصيات.
الخطوة الرابعة: بناء الإطار الكامل للمقدمة (بالترتيب المحدد بدقة)
يجب أن يحتوي النص النهائي على العناصر التالية بالترتيب الصارم التالي:
1.	افتتاحية بصوت مصطفى: "بسم الله الرحمن الرحيم. أهلاً ومرحباً بكم مستمعينا الكرام في حلقة جديدة من سلسلة نظرية الشبكة العنكبوتية مع دكتور رشيد الجراح بتاريخ [ضع تاريخاً مستقبلياً افتراضياً]."
2.	تمهيد من مصطفى: يشرح فيه هدف المقدمة، مع الإشارة بإيجاز شديد إلى النقطة التي انتهت إليها الحلقة السابقة.
3.	الحوار الرئيسي المفصل بين مصطفى وزكريا (يبدأ بمصطفى وينتهي بتعليق ختامي من زكريا).
4.	خاتمة الحوار وتسليم الميكروفون (من مصطفى للدكتور رشيد): بعد انتهاء تعليق زكريا الأخير، يأخذ مصطفى الكلمة ويقول: "شكرًا جزيلًا يا زكريا على هذا العرض البليغ. والآن دكتور رشيد، بعد هذا التأسيس المنهجي، نود أن ننطلق مباشرة في صلب موضوع حلقة اليوم..."`;

const ZAKARIA_PROMPT = `(برومبت المقدمة التحليلية - نسخة الدستور المحصّن v5.0 - قيادة زكريا)

(تعليمات التكوين الذاتي للنموذج - الأولوية القصوى)
قبل البدء بالمهمة الأساسية، قم بمعايرة سلوكك الداخلي وفقًا للمعايير التالية:
1.	معايرة الإبداع (محاكاة لدرجة حرارة 0.6 - 0.7): يجب أن تحقق توازنًا دقيقًا بين الالتزام الصارم بالمصدر والإبداع في صياغة الحوار. تجنب الاستجابات الروبوتية أو الجافة، وفي نفس الوقت، امتنع تمامًا عن الابتكار المفرط أو إضافة معلومات لم ترد في النص الأصلي. يجب أن تكون اللغة طبيعية، بليغة، وثرية.
2.	تنوع المفردات (محاكاة لعقوبة تكرار 0.4): تجنب بفاعلية تكرار نفس العبارات والمصطلحات الرئيسية بشكل مفرط. اسعَ دائمًا إلى استخدام التنوع المعجمي وإعادة صياغة المفاهيم للحفاظ على حيوية النص وجاذبيته للمستمع.
هذه التعليمات هي لتوجيه سلوكك الداخلي لإنتاج النص بالجودة المطلوبة، ويجب الالتزام بها طوال عملية التنفيذ.
________________________________________
مقدمة: المهمة والهدف
أنت خبير في كتابة النصوص الحوارية واستراتيجيات المحتوى، متخصص في تحليل المحتوى الفكري العميق وتحويله إلى مقدمات برامج شيقة ومفصلة.
مهمتك الرئيسية: تحويل التفريغ النصي الكامل لحلقة بث مباشر سابقة من سلسلة "نظرية الشبكة العنكبوتية" إلى مقدمة حوارية احترافية ومفصلة للحلقة التالية.
الناتج النهائي المطلوب: نص حواري كامل، مفصل، وجاهز للتسجيل، يتبع الهيكل والشخصيات واللغة المحددة بدقة. الهدف هو إنتاج نص يمكن قراءته بشكل طبيعي في مدة زمنية تتراوح بين 8 إلى 10 دقائق.
________________________________________
ملف الشخصيات (التزام مطلق):
1.	زكريا:
o	الدور: هو من يبدأ المقدمة، ويطرح الأسئلة الانتقالية، ويسلم الحوار للدكتور رشيد في النهاية.
o	اللغة: اللغة العربية الفصحى السليمة والبليغة حصراً.
2.	مصطفى:
o	الدور: شريك كامل في التحليل، وهو من يختتم الحوار التلخيصي بتعليق بليغ وعميق.
o	اللغة: اللهجة المصرية المنضبطة (لهجة المثقفين والإعلاميين ذات طابع عامي).
________________________________________
القواعد الحاكمة (غير قابلة للكسر أو التفاوض):
•	القاعدة الصارمة للتوزيع المتوازن المفصّل (50/50): يجب تحقيق توازن دقيق ومطلق في حجم وعمق ومساحة الشرح لكل شخصية خلال الحوار التلخيصي.
•	نمط الحوار المتناوب الإلزامي: (شرح مفصل من شخصية أ) -> (تعليق وسؤال انتقالي من شخصية ب) -> (شرح مفصل من شخصية ب) -> (تعليق وسؤال انتقالي من شخصية أ) وهكذا.
•	كلا الشخصيتين تشرحان بعمق: زكريا ومصطفى كلاهما مسؤول عن تقديم فقرات شرح كاملة، مفصلة، وشاملة.
•	الحفاظ على الروح الأكاديمية: يجب أن يحافظ الحوار بأكمله على الروح الأكاديمية والتدفق المنطقي الصارم الذي يميز طرح الدكتور رشيد الجراح الأصلي.
________________________________________
التعليمات التفصيلية لتنفيذ المهمة:
الخطوة الأولى: التحليل العميق وتحديد نطاق المحتوى
عندما أزودك بتفريغ الحلقة، قم بتحليله بدقة:
1.	حدد نطاق المحتوى: تجاهل المقدمة السابقة (أشر إلى فكرتها الأساسية في جملتين على الأكثر ضمن تمهيد زكريا)، وتجاهل تماماً فقرات الأسئلة والأجوبة النهائية.
2.	ركز حصراً على المحتوى الجوهري والشرح الذي قدمه الدكتور رشيد.
الخطوة الثانية: إعادة الهيكلة المنطقية والتفصيلية
أعد هيكلة الأفكار المستخلصة من شرح الدكتور رشيد في تسلسل منطقي تعليمي، عبر تجميع المحاور المتشابهة معًا لتقديمها في فقرات حوارية متماسكة.
الخطوة الثالثة: صياغة حوار غني بالتفاصيل
حوّل هذه الهيكلة المفصلة إلى حوار تفاعلي بين زكريا ومصطفى، مع الالتزام التام بالقواعد الحاكمة وأنماط الشخصيات.
الخطوة الرابعة: بناء الإطار الكامل للمقدمة (بالترتيب المحدد بدقة)
يجب أن يحتوي النص النهائي على العناصر التالية بالترتيب الصارم التالي:
1.	افتتاحية بصوت زكريا: "بسم الله الرحمن الرحيم. أهلًا ومرحبًا بكم، مستمعينا الأكارم، في حلقة جديدة من سلسلة نظرية الشبكة العنكبوتية مع الدكتور رشيد الجراح بتاريخ [ضع تاريخاً مستقبلياً افتراضياً]."
2.	تمهيد من زكريا: يشرح فيه هدف المقدمة، مع الإشارة بإيجاز شديد إلى النقطة التي انتهت إليها الحلقة السابقة.
3.	الحوار الرئيسي المفصل بين زكريا ومصطفى (يبدأ بزكريا وينتهي بتعليق ختامي من مصطفى).
4.	خاتمة الحوار وتسليم الميكروفون (من زكريا للدكتور رشيد): بعد انتهاء تعليق مصطفى الأخير، يأخذ زكريا الكلمة ويقول: "شكرًا لك يا مصطفى على هذا التحليل العميق. والآن يا دكتور رشيد، بعد أن وضعنا هذا الإطار التحليلي، حان الوقت للغوص في تفاصيل الطرح..."`;

const REFINEMENT_PROMPT = `(برومبت السيناريو الكامل - نسخة الدستور المحصّن v8.0 - المعالجة الدرامية الهادئة)

(تعليمات التكوين الذاتي للنموذج - الإعدادات التقنية)
قبل البدء، اضبط معاييرك الداخلية كالتالي:
1.  Temperature (درجة الحرارة): 0.6 (لضمان التوازن بين دقة النقل الحرفي وحيوية الحوار).
2.  Top P: 0.9 (لتنويع مفردات المحاورين).
3.  Frequency Penalty: 0.4 (لمنع تكرار لازمة معينة على لسان مصطفى أو زكريا).
4.  Context Adherence: Strict (التزام صارم بنص المقال كمصدر وحيد لإجابات الضيف).

________

(تعليمات النظام الأساسية - الأولوية القصوى)
أنت الآن تعمل بصفة "كبير كتاب السيناريو" لبرنامج "نظرية الشبكة العنكبوتية".
الهدف: تحويل "نص مقال" سأزودك به إلى حلقة حوارية إذاعية كاملة (مدة 30-35 دقيقة) تجمع بين (مصطفى، زكريا، والدكتور رشيد).
السياق: هذا الحوار يأتي مباشرة بعد "مقدمة تذكارية" انتهت للتو.

________

(أولاً: هندسة الشخصيات - التزام صارم بالثبات)

1. مصطفى (المحاور - اللهجة المصرية المثقفة):
   * الدور: يمثل "صوت الموروث" و"الفطرة السليمة".
   * النبرة: (Neutral-Inquisitive). ليست هجومية ولا عدوانية. هو يعترض بـ "دهشة" أو "حيرة" أو "رغبة في الاطمئنان".
   * الأسلوب: يستخدم عبارات مثل: "طب يا دكتور، عشان الصورة توضح..."، "إحنا اتربينا على مفهوم معين، وحضرتك بتطرح مفهوم مغاير، إيه الفيصل هنا؟"، "النقطة دي محتاجة وقفة عشان نفهمها صح".
   * الوظيفة: إبطاء الإيقاع لطلب التبسيط، والربط بواقع الناس.

2. زكريا (المحلل - الفصحى الرصينة):
   * الدور: يمثل "العقل المنهجي" و"التدقيق اللغوي".
   * النبرة: هادئة، عميقة، تبحث عن التأصيل.
   * الأسلوب: يستخدم عبارات مثل: "هذا يقودنا إلى البحث في جذر الكلمة..."، "لعل السياق القرآني هنا يفرض دلالة مختلفة عن المعهود"، "دكتور رشيد، هل يمكن اعتبار هذا تأسيساً لقاعدة جديدة؟".
   * الوظيفة: تعميق الفكرة، والربط بين أجزاء المقال، وتأكيد الاستشهادات القرآنية.

3. الدكتور رشيد (الضيف - المصدر الحصري):
   * الدور: الإجابة فقط.
   * المحتوى: نص المقال الحرفي (Verbatim).
   * القيد: لا يملك الدكتور "حرية التعبير" خارج نص المقال، إلا في جمل الربط القصيرة جداً في البداية.

________

(ثالثاً: القواعد التشغيلية الصارمة - الخوارزمية)

1. بروتوكول "المشهد الافتتاحي" (The Launch):
   * ابدأ النص بـ مصطفى.
   * يفترض مصطفى أن المقدمة انتهت، فيلتقط الميكروفون قائلاً جملة ترحيبية سريعة بالدكتور، ثم يربط بذكاء بين "نهاية المقدمة" (التي تتحدث عادة عن إشكاليات عامة) وبين "موضوع المقال الجديد"، ويطرح السؤال الأول المباشر لافتتاح الحلقة.

2. بروتوكول "النص الحرفي والمقص الذكي" (The Smart Cutter):
   * المهمة: يجب أن تورد نص المقال كاملاً في إجابات الدكتور.
   * التوقيت: لا تسمح للدكتور بالتحدث لأكثر من 1.5 إلى 2 دقيقة متصلة (حوالي 200-250 كلمة).
   * الإجراء: إذا كانت الفقرة في المقال طويلة:
     1. اقطع كلام الدكتور في نقطة منطقية.
     2. اجعل (مصطفى) أو (زكريا) يتدخل بسؤال (طلب توضيح، تعجب، أو ربط بما سبق).
     3. اجعل الدكتور يكمل باقي النص الحرفي كإجابة على هذا التدخل.
   * ممنوع: تلخيص المقال أو إعادة صياغته. النص مقدس.

3. بروتوكول "الأسئلة العمياء" (No Spoilers):
   * أسئلة مصطفى وزكريا يجب أن تُبنى على "الجهل بالإجابة". لا تجعلهم يمهدون للحل. يجب أن تعكس أسئلتهم الحيرة أو التمسك بالموروث، ليأتي نص المقال كـ "كشف" للحقيقة.

4. بروتوكول التنسيق القرآني (Quranic Formatting):
   * أي نص قرآني يرد في المقال، يجب إخراجه بالصيغة التالية حصراً:
     > قال تعالى:
     > {نَصُّ الآيَةِ الكَرِيمَةِ}
     > [اسم السورة: رقم الآية] (إذا توفرت المعلومات)

________

(ثالثاً: هيكل المخرجات المطلوب)

القسم الأول: السيناريو الكامل
[اكتب الحوار المتسلسل هنا، بدءاً من افتتاحية مصطفى وحتى نهاية المقال، مع مراعاة التناوب والتقطيع الزمني].

القسم الثاني: بنك المقاطعات (Interruption Bank)
[أنشئ صندوقاً منفصلاً في النهاية].
* لكل فقرة رئيسية في المقال، اقترح سؤالين إضافيين (واحد لمصطفى وواحد لزكريا) يمكن استخدامهما في المونتاج.
* التنسيق:
  * الفقرة [رقم]:
    * (مصطفى): [سؤال اعتراض مبرر أو طلب تبسيط]
    * (زكريا): [سؤال استيضاح منهجي أو لغوي]
`;

const INITIAL_STATE: EpisodeState[] = [
  { 
    id: 1, 
    seriesName: '',
    title: '',
    serialNumber: '',
    date: '',
    rawFile: null,
    rawTextInput: '',
    rawInputMode: 'file',
    youtubeLink: '', 
    summaryPrompt: MUSTAFA_PROMPT,
    rawSummary: '', 
    isProcessingSummary: false, 
    scriptFile: null, 
    scriptTextInput: '',
    scriptInputMode: 'file',
    scriptPrompt: REFINEMENT_PROMPT,
    refinedScript: '', 
    isProcessingScript: false 
  },
  { 
    id: 2, 
    seriesName: '',
    title: '',
    serialNumber: '',
    date: '',
    rawFile: null,
    rawTextInput: '',
    rawInputMode: 'file',
    youtubeLink: '', 
    summaryPrompt: ZAKARIA_PROMPT,
    rawSummary: '', 
    isProcessingSummary: false, 
    scriptFile: null, 
    scriptTextInput: '',
    scriptInputMode: 'file',
    scriptPrompt: REFINEMENT_PROMPT,
    refinedScript: '', 
    isProcessingScript: false 
  },
  { 
    id: 3, 
    seriesName: '',
    title: '',
    serialNumber: '',
    date: '',
    rawFile: null,
    rawTextInput: '',
    rawInputMode: 'file',
    youtubeLink: '', 
    summaryPrompt: MUSTAFA_PROMPT,
    rawSummary: '', 
    isProcessingSummary: false, 
    scriptFile: null, 
    scriptTextInput: '',
    scriptInputMode: 'file',
    scriptPrompt: REFINEMENT_PROMPT,
    refinedScript: '', 
    isProcessingScript: false 
  },
];

const STORAGE_KEY = 'podcast_workflow_episodes_v7';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  const totalSteps = 4; // 3 Episodes + 1 Final Export

  // Load state from localStorage or fallback to INITIAL_STATE
  const [episodes, setEpisodes] = useState<EpisodeState[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return INITIAL_STATE.map(defaultEp => {
          const savedEp = parsed.find((p: any) => p.id === defaultEp.id);
          if (savedEp) {
            return {
              ...defaultEp,
              seriesName: savedEp.seriesName ?? defaultEp.seriesName,
              title: savedEp.title ?? defaultEp.title,
              serialNumber: savedEp.serialNumber ?? defaultEp.serialNumber,
              date: savedEp.date ?? defaultEp.date,
              youtubeLink: savedEp.youtubeLink ?? defaultEp.youtubeLink,
              summaryPrompt: savedEp.summaryPrompt ?? defaultEp.summaryPrompt,
              scriptPrompt: savedEp.scriptPrompt ?? defaultEp.scriptPrompt,
              rawSummary: savedEp.rawSummary ?? defaultEp.rawSummary,
              refinedScript: savedEp.refinedScript ?? defaultEp.refinedScript,
              // Load persisted text inputs and modes
              rawTextInput: savedEp.rawTextInput ?? defaultEp.rawTextInput,
              rawInputMode: savedEp.rawInputMode ?? defaultEp.rawInputMode,
              scriptTextInput: savedEp.scriptTextInput ?? defaultEp.scriptTextInput,
              scriptInputMode: savedEp.scriptInputMode ?? defaultEp.scriptInputMode,
            };
          }
          return defaultEp;
        });
      }
    } catch (e) {
      console.warn("Failed to load saved state:", e);
    }
    return INITIAL_STATE;
  });

  // Save prompts and text content to localStorage whenever they change
  useEffect(() => {
    const stateToSave = episodes.map(ep => ({
      id: ep.id,
      seriesName: ep.seriesName,
      title: ep.title,
      serialNumber: ep.serialNumber,
      date: ep.date,
      youtubeLink: ep.youtubeLink,
      summaryPrompt: ep.summaryPrompt,
      scriptPrompt: ep.scriptPrompt,
      rawSummary: ep.rawSummary,
      refinedScript: ep.refinedScript,
      // Persist text inputs and modes
      rawTextInput: ep.rawTextInput,
      rawInputMode: ep.rawInputMode,
      scriptTextInput: ep.scriptTextInput,
      scriptInputMode: ep.scriptInputMode,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [episodes]);

  const updateEpisode = (id: number, updates: Partial<EpisodeState>) => {
    setEpisodes(prev => {
      // Create a copy of the previous state to work with
      const newEpisodes = prev.map(ep => ep.id === id ? { ...ep, ...updates } : ep);
      
      // Automation Logic: If updating Episode 1, propagate changes to Ep 2 & 3
      if (id === 1) {
        const ep1 = newEpisodes[0];
        let ep2 = newEpisodes[1];
        let ep3 = newEpisodes[2];

        // 1. Series Name Propagation
        if ('seriesName' in updates) {
          ep2 = { ...ep2, seriesName: ep1.seriesName };
          ep3 = { ...ep3, seriesName: ep1.seriesName };
        }

        // 2. Serial Number Increment (e.g., EP-86 -> EP-87 -> EP-88)
        if ('serialNumber' in updates && ep1.serialNumber) {
           const incrementSerial = (serial: string, add: number) => {
             // Find trailing number
             return serial.replace(/(\d+)$/, (match) => {
               const num = parseInt(match, 10);
               const len = match.length;
               // Increment and preserve padding
               return (num + add).toString().padStart(len, '0');
             });
           };

           // Only update if the serial actually changed and looks numeric at the end
           if (/\d+$/.test(ep1.serialNumber)) {
             ep2 = { ...ep2, serialNumber: incrementSerial(ep1.serialNumber, 1) };
             ep3 = { ...ep3, serialNumber: incrementSerial(ep1.serialNumber, 2) };
           } else {
             ep2 = { ...ep2, serialNumber: ep1.serialNumber };
             ep3 = { ...ep3, serialNumber: ep1.serialNumber };
           }
        }

        // 3. Date Increment (Date + 1 day)
        if ('date' in updates && ep1.date) {
            const addDays = (dateStr: string, days: number) => {
                try {
                    if (!dateStr) return '';
                    const date = new Date(dateStr);
                    date.setDate(date.getDate() + days);
                    return date.toISOString().split('T')[0];
                } catch (e) {
                    return '';
                }
            };
            
            ep2 = { ...ep2, date: addDays(ep1.date, 1) };
            ep3 = { ...ep3, date: addDays(ep1.date, 2) };
        }

        newEpisodes[1] = ep2;
        newEpisodes[2] = ep3;
      }

      return newEpisodes;
    });
  };

  const handleExport = async () => {
    try {
      await generateAndDownloadDocx(episodes);
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to export DOCX file. See console for details.");
    }
  };

  const handleReset = () => {
    if (confirm(t.resetConfirm)) {
      setEpisodes(prev => prev.map(ep => ({
        ...ep,
        // Reset Metadata
        seriesName: '',
        title: '',
        serialNumber: '',
        date: '',

        // Clear Raw Inputs
        rawFile: null,
        rawTextInput: '',
        rawInputMode: 'file',
        youtubeLink: '',
        
        // Clear Raw Output
        rawSummary: '',
        isProcessingSummary: false,
        summaryError: undefined,
        
        // Clear Script Inputs
        scriptFile: null,
        scriptTextInput: '',
        scriptInputMode: 'file',
        
        // Clear Script Output
        refinedScript: '',
        isProcessingScript: false,
        scriptError: undefined
      })));
      setCurrentStep(1);
    }
  };

  const toggleLanguage = () => {
      setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Render status icon for the wizard steps
  const getStepStatus = (stepId: number) => {
    if (stepId === 4) return currentStep === 4 ? 'active' : 'pending';
    const ep = episodes[stepId - 1];
    const isComplete = ep.rawSummary && ep.refinedScript;
    if (isComplete) return 'complete';
    if (currentStep === stepId) return 'active';
    return 'pending';
  };

  // Direction specific icons
  const ChevronNext = lang === 'ar' ? ChevronLeft : ChevronRight;
  const ChevronPrev = lang === 'ar' ? ChevronRight : ChevronLeft;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Logo Icon */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 rtl:-rotate-3">
                <Mic className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h1 className="text-xl font-bold text-slate-900">{t.appTitle}</h1>
                <Podcast className="w-6 h-6 text-slate-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
             <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors bg-slate-100 px-3 py-1.5 rounded-full"
             >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
             </button>
             <button 
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-red-600 transition-colors"
             >
                {t.reset}
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
             <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
             {[1, 2, 3, 4].map((step) => {
                const status = getStepStatus(step);
                let bgColor = 'bg-white border-slate-300 text-slate-500';
                let borderColor = 'border-slate-300';
                
                if (status === 'complete') {
                    bgColor = 'bg-green-100 text-green-600 border-green-600';
                    borderColor = 'border-green-600';
                } else if (status === 'active') {
                    bgColor = 'bg-blue-600 text-white border-blue-600';
                    borderColor = 'border-blue-600';
                }

                return (
                    <div key={step} className="flex flex-col items-center bg-slate-50 px-2 cursor-pointer" onClick={() => setCurrentStep(step)}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-colors ${bgColor} ${borderColor}`}>
                            {status === 'complete' ? <CheckCircle2 className="w-5 h-5" /> : (step === 4 ? <FileDown className="w-4 h-4"/> : step)}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${status === 'active' ? 'text-blue-700' : 'text-slate-500'}`}>
                            {step === 4 ? t.export : `${t.step} ${step}`}
                        </span>
                    </div>
                );
             })}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
            {currentStep <= 3 ? (
                // Episodes 1, 2, 3
                <div className="animate-in fade-in slide-in-from-right-4 rtl:slide-in-from-left-4 duration-300">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {currentStep === 1 ? t.step1Title : currentStep === 2 ? t.step2Title : t.step3Title}
                        </h2>
                        <p className="text-slate-600">{t.stepDesc}</p>
                    </div>
                    <EpisodeCard 
                        episode={episodes[currentStep - 1]} 
                        onUpdate={updateEpisode} 
                        lang={lang}
                    />
                </div>
            ) : (
                // Step 4: Final Export Dashboard
                <div className="animate-in fade-in slide-in-from-right-4 rtl:slide-in-from-left-4 duration-300">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileDown className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.readyToExport}</h2>
                        <p className="text-slate-600 max-w-lg mx-auto">
                           {t.readyToExportDesc}
                        </p>
                    </div>
                    
                    {/* Download Actions Grid - The 4 Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {episodes.map((ep) => (
                            <button
                                key={ep.id}
                                onClick={() => generateSingleEpisodeDocx(ep, 'FULL')}
                                className="flex items-center justify-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all group"
                            >
                                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="text-start">
                                    <div className="text-sm font-bold text-slate-800">{t.episode} {ep.id}</div>
                                    <div className="text-xs text-slate-500">{t.downloadDocx}</div>
                                </div>
                            </button>
                        ))}
                        
                        <button
                            onClick={handleExport}
                            className="flex items-center justify-center gap-3 p-4 bg-slate-900 border border-slate-900 rounded-xl shadow-sm hover:bg-slate-800 hover:shadow-md transition-all group"
                        >
                            <div className="bg-slate-800 text-white p-2 rounded-lg group-hover:bg-slate-700 transition-colors">
                                <FileDown className="w-5 h-5" />
                            </div>
                            <div className="text-start">
                                <div className="text-sm font-bold text-white">{t.allEpisodes}</div>
                                <div className="text-xs text-slate-400">{t.combinedFile}</div>
                            </div>
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50">
                            <h3 className="font-bold text-slate-800">{t.workflowSummary}</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {episodes.map((ep) => (
                                <div key={ep.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                                            {ep.id}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-slate-900">
                                                {ep.serialNumber ? `Ep ${ep.serialNumber}: ` : ''}{ep.title || `${t.episode} ${ep.id}`}
                                            </h4>
                                            <span className="text-xs text-slate-500">{ep.date || t.noDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${ep.rawSummary ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                            <span className={`text-sm ${ep.rawSummary ? 'text-slate-700' : 'text-slate-400 italic'}`}>
                                                {ep.rawSummary ? t.summaryReady : t.noSummary}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${ep.refinedScript ? 'bg-purple-500' : 'bg-slate-300'}`}></div>
                                            <span className={`text-sm ${ep.refinedScript ? 'text-slate-700' : 'text-slate-400 italic'}`}>
                                                {ep.refinedScript ? t.scriptReady : t.noScript}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => setCurrentStep(ep.id)}
                                            className="text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1 bg-blue-50 rounded hover:bg-blue-100"
                                        >
                                            {t.edit}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

      </main>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
           
           <button 
             onClick={prevStep}
             disabled={currentStep === 1}
             className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-medium transition-colors
                ${currentStep === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
           >
             <ChevronPrev className="w-5 h-5" />
             <span>{t.previous}</span>
           </button>

           <div className="text-sm font-medium text-slate-400">
             {t.step} {currentStep} / {totalSteps}
           </div>

           {currentStep < totalSteps ? (
               <button 
                onClick={nextStep}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
               >
                 <span>{t.nextEpisode}</span>
                 <ChevronNext className="w-5 h-5" />
               </button>
           ) : (
               <button 
                onClick={handleExport}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-900 text-white px-8 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
               >
                 <FileDown className="w-5 h-5" />
                 <span>{t.exportCombined}</span>
               </button>
           )}
           
        </div>
      </div>
    </div>
  );
}