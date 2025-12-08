

import React, { useState } from 'react';
import { EpisodeState, FileType, Language } from '../types';
import { FileUploader } from './FileUploader';
import { Sparkles, Loader2, AlertCircle, MessageSquare, FileDown, FileText, ChevronDown, ChevronRight, ScrollText, ChevronLeft, Youtube, Trash2 } from 'lucide-react';
import { generateSummary, refineScript } from '../services/geminiService';
import { generateSingleEpisodeDocx } from '../utils/docxGenerator';
import { translations } from '../utils/translations';

interface EpisodeCardProps {
  episode: EpisodeState;
  onUpdate: (id: number, updates: Partial<EpisodeState>) => void;
  lang: Language;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onUpdate, lang }) => {
  const t = translations[lang];
  const [isSummaryPromptOpen, setIsSummaryPromptOpen] = useState(false);
  const [isScriptPromptOpen, setIsScriptPromptOpen] = useState(false);
  
  const handleSummary = async () => {
    const hasFile = !!episode.rawFile;
    const hasText = episode.rawInputMode === 'text' && !!episode.rawTextInput;
    const hasYoutube = !!episode.youtubeLink;

    if (!hasFile && !hasText && !hasYoutube) return;
    
    onUpdate(episode.id, { isProcessingSummary: true, summaryError: undefined });
    
    try {
      const summary = await generateSummary(
          episode.rawFile, 
          episode.rawInputMode === 'text' ? episode.rawTextInput : '', 
          episode.summaryPrompt, 
          episode.youtubeLink
      );
      onUpdate(episode.id, { rawSummary: summary, isProcessingSummary: false });
    } catch (error) {
      onUpdate(episode.id, { 
        isProcessingSummary: false, 
        summaryError: t.errSummary 
      });
    }
  };

  const handleRefinement = async () => {
    const hasFile = !!episode.scriptFile;
    const hasText = episode.scriptInputMode === 'text' && !!episode.scriptTextInput;

    if (!hasFile && !hasText) return;

    onUpdate(episode.id, { isProcessingScript: true, scriptError: undefined });

    try {
      const refined = await refineScript(
          episode.scriptFile, 
          episode.scriptInputMode === 'text' ? episode.scriptTextInput : '',
          episode.scriptPrompt
      );
      onUpdate(episode.id, { refinedScript: refined, isProcessingScript: false });
    } catch (error) {
      onUpdate(episode.id, { 
        isProcessingScript: false, 
        scriptError: t.errScript 
      });
    }
  };

  const handleClearEpisode = () => {
    if (confirm(t.confirmClearEpisode)) {
        onUpdate(episode.id, {
             seriesName: '',
             title: '',
             serialNumber: '',
             date: '',
             rawFile: null,
             rawTextInput: '',
             youtubeLink: '',
             rawSummary: '',
             isProcessingSummary: false,
             summaryError: undefined,
             scriptFile: null,
             scriptTextInput: '',
             refinedScript: '',
             isProcessingScript: false,
             scriptError: undefined
        });
    }
  };

  const isSummaryDisabled = () => {
      const hasFile = !!episode.rawFile;
      const hasText = episode.rawInputMode === 'text' && !!episode.rawTextInput;
      const hasYoutube = !!episode.youtubeLink;
      return (!hasFile && !hasText && !hasYoutube) || episode.isProcessingSummary;
  };

  const isScriptDisabled = () => {
      const hasFile = !!episode.scriptFile;
      const hasText = episode.scriptInputMode === 'text' && !!episode.scriptTextInput;
      return (!hasFile && !hasText) || episode.isProcessingScript;
  };

  // Helper for toggle icon direction based on language
  const ChevronToggle = isSummaryPromptOpen || isScriptPromptOpen ? ChevronDown : (lang === 'ar' ? ChevronLeft : ChevronRight);
  const ChevronToggleScript = isScriptPromptOpen ? ChevronDown : (lang === 'ar' ? ChevronLeft : ChevronRight);
  const ChevronToggleSummary = isSummaryPromptOpen ? ChevronDown : (lang === 'ar' ? ChevronLeft : ChevronRight);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* Header Section */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-800">{t.episode} {episode.id}</h2>
            <div className="text-xs font-medium px-2 py-1 bg-slate-200 text-slate-600 rounded">
            {t.workflow}
            </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
            <button 
                onClick={() => generateSingleEpisodeDocx(episode, 'SUMMARY_ONLY')}
                className="flex-1 sm:flex-none justify-center flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-md transition-colors"
                title={t.exportSummary}
            >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.exportSummary}</span>
            </button>
            <button 
                onClick={() => generateSingleEpisodeDocx(episode, 'SCRIPT_ONLY')}
                className="flex-1 sm:flex-none justify-center flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md transition-colors"
                title={t.exportScript}
            >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.exportScript}</span>
            </button>
            <button 
                onClick={() => generateSingleEpisodeDocx(episode, 'FULL')}
                className="flex-1 sm:flex-none justify-center flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors"
                title={t.exportAll}
            >
                <FileDown className="w-3.5 h-3.5" />
                <span>{t.exportAll}</span>
            </button>
            <div className="w-px h-6 bg-slate-300 mx-1 self-center hidden sm:block"></div>
            <button 
                onClick={handleClearEpisode}
                className="flex-1 sm:flex-none justify-center flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors"
                title={t.clearEpisode}
            >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.clearEpisode}</span>
            </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        
        {/* Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100">
           <div className="sm:col-span-1">
             <label className="block text-xs font-semibold text-slate-500 mb-1">{t.seriesName}</label>
             <input 
               type="text" 
               value={episode.seriesName}
               onChange={(e) => onUpdate(episode.id, { seriesName: e.target.value })}
               placeholder={t.seriesName}
               className="w-full text-sm font-bold p-2 bg-slate-900 text-white border border-slate-700 placeholder-slate-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             />
           </div>
           <div>
             <label className="block text-xs font-semibold text-slate-500 mb-1">{t.serialNumber}</label>
             <input 
               type="text" 
               value={episode.serialNumber}
               onChange={(e) => onUpdate(episode.id, { serialNumber: e.target.value })}
               placeholder="e.g. 05"
               className="w-full text-sm font-bold p-2 bg-slate-900 text-white border border-slate-700 placeholder-slate-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             />
           </div>
           <div className="sm:col-span-1">
             <label className="block text-xs font-semibold text-slate-500 mb-1">{t.episodeTitle}</label>
             <input 
               type="text" 
               value={episode.title}
               onChange={(e) => onUpdate(episode.id, { title: e.target.value })}
               placeholder={t.episodeTitle}
               className="w-full text-sm font-bold p-2 bg-slate-900 text-white border border-slate-700 placeholder-slate-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             />
           </div>
           <div>
             <label className="block text-xs font-semibold text-slate-500 mb-1">{t.date}</label>
             <input 
               type="date" 
               value={episode.date}
               onChange={(e) => onUpdate(episode.id, { date: e.target.value })}
               className="w-full text-sm font-bold p-2 bg-slate-900 text-white border border-slate-700 placeholder-slate-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Raw Episode -> Summary */}
          <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">1</span>
                  <h3 className="font-semibold text-slate-800">{t.rawSectionTitle}</h3>
              </div>
              
              {/* Input Group: Wrapper to match height with right side */}
              <div className="flex flex-col gap-4 h-64">
                {/* File Upload / Paste Text (Takes available space) */}
                <FileUploader 
                    label={t.uploadRaw}
                    accept=".mp3,.wav,.txt,.md,.docx"
                    fileTypeHint={FileType.AUDIO_OR_TEXT}
                    file={episode.rawFile}
                    onFileSelect={(f) => onUpdate(episode.id, { rawFile: f })}
                    onClear={() => onUpdate(episode.id, { rawFile: null })}
                    className="flex-1"
                    textValue={episode.rawTextInput}
                    onTextChange={(t) => onUpdate(episode.id, { rawTextInput: t })}
                    inputType={episode.rawInputMode}
                    onInputTypeChange={(mode) => onUpdate(episode.id, { rawInputMode: mode })}
                    lang={lang}
                />
                
                {/* YouTube Link (Fixed height at bottom of input group) */}
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">{t.orYoutube}</label>
                   <div className="relative">
                        <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                            <Youtube className="h-5 w-5 text-red-500" />
                        </div>
                        <input 
                            type="text"
                            value={episode.youtubeLink}
                            onChange={(e) => onUpdate(episode.id, { youtubeLink: e.target.value })}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full pl-10 pr-3 rtl:pr-10 rtl:pl-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-start"
                        />
                   </div>
                </div>
              </div>

              <div className="space-y-1">
                  <button 
                    onClick={() => setIsSummaryPromptOpen(!isSummaryPromptOpen)}
                    className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-700 focus:outline-none transition-colors"
                  >
                      <ChevronToggleSummary className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                      <MessageSquare className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {t.summaryPrompt}
                  </button>
                  {isSummaryPromptOpen && (
                    <textarea
                        value={episode.summaryPrompt}
                        onChange={(e) => onUpdate(episode.id, { summaryPrompt: e.target.value })}
                        className="w-full h-64 p-2 text-xs text-slate-600 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-slate-50 resize-y"
                    />
                  )}
              </div>

              <button
                  onClick={handleSummary}
                  disabled={isSummaryDisabled()}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${isSummaryDisabled()
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
              >
                  {episode.isProcessingSummary ? (
                      <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t.generatingSummary}</span>
                      </>
                  ) : (
                      <>
                          <Sparkles className="w-4 h-4" />
                          <span>{t.generateSummary}</span>
                      </>
                  )}
              </button>

              {episode.summaryError && (
                   <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{episode.summaryError}</span>
                   </div>
              )}

              <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.outputSummary}</label>
                  <textarea
                      value={episode.rawSummary}
                      onChange={(e) => onUpdate(episode.id, { rawSummary: e.target.value })}
                      placeholder={t.summaryPlaceholder}
                      className="w-full h-32 p-3 text-sm text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 resize-y"
                  />
              </div>
          </div>

          {/* Right Column: Script -> Refinement */}
          <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">2</span>
                  <h3 className="font-semibold text-slate-800">{t.scriptSectionTitle}</h3>
              </div>

              {/* Input Group: Matches height of Left Input Group */}
              <div className="flex flex-col h-64">
                <FileUploader 
                    label={t.uploadScript}
                    accept=".txt,.docx"
                    fileTypeHint={FileType.TEXT_ONLY}
                    file={episode.scriptFile}
                    onFileSelect={(f) => onUpdate(episode.id, { scriptFile: f })}
                    onClear={() => onUpdate(episode.id, { scriptFile: null })}
                    className="h-full"
                    textValue={episode.scriptTextInput}
                    onTextChange={(t) => onUpdate(episode.id, { scriptTextInput: t })}
                    inputType={episode.scriptInputMode}
                    onInputTypeChange={(mode) => onUpdate(episode.id, { scriptInputMode: mode })}
                    lang={lang}
                />
              </div>

              <div className="space-y-1">
                  <button 
                    onClick={() => setIsScriptPromptOpen(!isScriptPromptOpen)}
                    className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-700 focus:outline-none transition-colors"
                  >
                      <ChevronToggleScript className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                      <MessageSquare className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {t.refinementPrompt}
                  </button>
                  {isScriptPromptOpen && (
                    <textarea
                        value={episode.scriptPrompt}
                        onChange={(e) => onUpdate(episode.id, { scriptPrompt: e.target.value })}
                        className="w-full h-64 p-2 text-xs text-slate-600 border border-slate-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent bg-slate-50 resize-y"
                    />
                  )}
              </div>

              <button
                  onClick={handleRefinement}
                  disabled={isScriptDisabled()}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${isScriptDisabled()
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                          : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'}`}
              >
                  {episode.isProcessingScript ? (
                      <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t.refiningScript}</span>
                      </>
                  ) : (
                      <>
                          <ScrollText className="w-4 h-4" />
                          <span>{t.refineScript}</span>
                      </>
                  )}
              </button>

              {episode.scriptError && (
                   <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{episode.scriptError}</span>
                   </div>
              )}

              <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.outputScript}</label>
                  <textarea
                      value={episode.refinedScript}
                      onChange={(e) => onUpdate(episode.id, { refinedScript: e.target.value })}
                      placeholder={t.scriptPlaceholder}
                      className="w-full h-32 p-3 text-sm text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50 resize-y"
                  />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};