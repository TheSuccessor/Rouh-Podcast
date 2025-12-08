

export type Language = 'en' | 'ar';

export const translations = {
  en: {
    appTitle: "Rouh Podcast",
    reset: "Reset All Content",
    geminiModel: "Gemini 3 Pro",
    step: "Step",
    episode: "Episode",
    workflow: "Workflow",
    export: "Export",
    previous: "Previous",
    next: "Next",
    nextEpisode: "Next Episode",
    exportCombined: "Export Combined File (All Episodes)",
    readyToExport: "Ready to Export",
    readyToExportDesc: "Select an option below to download individual episodes or the complete combined document.",
    workflowSummary: "Workflow Summary",
    downloadDocx: "Download Docx",
    combinedFile: "Combined File",
    allEpisodes: "All Episodes",
    edit: "Edit",
    summaryReady: "Summary Ready",
    noSummary: "No Summary",
    scriptReady: "Script Ready",
    noScript: "No Script",
    noDate: "No date set",
    
    // Episode Card
    seriesName: "Series Name",
    serialNumber: "Serial Number",
    episodeTitle: "Episode Title",
    date: "Date",
    exportSummary: "Export Summary",
    exportScript: "Export Script",
    exportAll: "Export All",
    clearEpisode: "Clear Episode",
    
    rawSectionTitle: "Raw Previous Episode to Summary",
    orYoutube: "Or YouTube Link",
    summaryPrompt: "Summary Prompt",
    generateSummary: "Generate Summary",
    generatingSummary: "Generating Summary...",
    outputSummary: "Output Summary",
    summaryPlaceholder: "Summary will appear here...",
    
    scriptSectionTitle: "Script Refinement",
    refinementPrompt: "Refinement Prompt",
    refineScript: "Refine Script",
    refiningScript: "Refining Script...",
    outputScript: "Output Script",
    scriptPlaceholder: "Refined script will appear here...",
    
    // Uploader
    uploadRaw: "Upload Raw Episode",
    uploadScript: "Upload Script",
    clickToUpload: "Click to upload",
    hintAudio: "Audio, Word, or Text",
    hintText: "Text / Word",
    pasteContent: "Paste your content here...",
    fileMode: "File",
    textMode: "Text",
    
    // Errors
    errSummary: "Failed to generate summary. Please check your API key and try again.",
    errScript: "Failed to refine script. Please check your API key and try again.",
    
    // Reset Confirm
    resetConfirm: "Are you sure you want to clear ALL content (metadata, files, outputs) for ALL episodes?",
    confirmClearEpisode: "Are you sure you want to clear all content for this episode?",
    
    step1Title: "Episode 1 Workflow",
    step2Title: "Episode 2 Workflow",
    step3Title: "Episode 3 Workflow",
    stepDesc: "Upload raw files, generate summaries, and refine scripts for this episode."
  },
  ar: {
    appTitle: "بودكاست روح",
    reset: "إعادة ضبط الكل",
    geminiModel: "Gemini 3 Pro",
    step: "الخطوة",
    episode: "الحلقة",
    workflow: "سير العمل",
    export: "تصدير",
    previous: "السابق",
    next: "التالي",
    nextEpisode: "الحلقة التالية",
    exportCombined: "تصدير الملف المجمع (كل الحلقات)",
    readyToExport: "جاهز للتصدير",
    readyToExportDesc: "اختر خيارًا أدناه لتحميل الحلقات بشكل فردي أو المستند المجمع الكامل.",
    workflowSummary: "ملخص سير العمل",
    downloadDocx: "تحميل ملف Word",
    combinedFile: "ملف مجمع",
    allEpisodes: "جميع الحلقات",
    edit: "تعديل",
    summaryReady: "الملخص جاهز",
    noSummary: "لا يوجد ملخص",
    scriptReady: "السيناريو جاهز",
    noScript: "لا يوجد سيناريو",
    noDate: "لم يتم تحديد تاريخ",
    
    // Episode Card
    seriesName: "اسم السلسلة",
    serialNumber: "رقم الحلقة",
    episodeTitle: "عنوان الحلقة",
    date: "التاريخ",
    exportSummary: "تصدير الملخص",
    exportScript: "تصدير السيناريو",
    exportAll: "تصدير الكل",
    clearEpisode: "مسح الحلقة",
    
    rawSectionTitle: "تحويل الحلقة الخام السابقة إلى ملخص",
    orYoutube: "أو رابط يوتيوب",
    summaryPrompt: "تعليمات التلخيص",
    generateSummary: "توليد الملخص",
    generatingSummary: "جاري التلخيص...",
    outputSummary: "مُخرجات الملخص",
    summaryPlaceholder: "سيظهر الملخص هنا...",
    
    scriptSectionTitle: "تنقيح السيناريو",
    refinementPrompt: "تعليمات التنقيح",
    refineScript: "تنقيح السيناريو",
    refiningScript: "جاري التنقيح...",
    outputScript: "مُخرجات السيناريو",
    scriptPlaceholder: "سيظهر السيناريو المنقح هنا...",
    
    // Uploader
    uploadRaw: "رفع ملف الحلقة الخام",
    uploadScript: "رفع ملف السيناريو",
    clickToUpload: "اضغط للرفع",
    hintAudio: "صوت، ملف Word، أو نص",
    hintText: "نص / Word",
    pasteContent: "الصق النص هنا...",
    fileMode: "ملف",
    textMode: "نص",
    
    // Errors
    errSummary: "فشل توليد الملخص. يرجى التحقق من مفتاح API والمحاولة مرة أخرى.",
    errScript: "فشل تنقيح السيناريو. يرجى التحقق من مفتاح API والمحاولة مرة أخرى.",
    
    // Reset Confirm
    resetConfirm: "هل أنت متأكد من مسح جميع المحتويات (البيانات، الملفات، المخرجات) لجميع الحلقات؟",
    confirmClearEpisode: "هل أنت متأكد من مسح محتويات هذه الحلقة؟",
    
    step1Title: "سير عمل الحلقة 1",
    step2Title: "سير عمل الحلقة 2",
    step3Title: "سير عمل الحلقة 3",
    stepDesc: "قم برفع الملفات الخام، توليد الملخصات، وتنقيح النصوص لهذه الحلقة."
  }
};