
import React, { useRef } from 'react';
import { Upload, FileAudio, FileText, X } from 'lucide-react';
import { FileType, Language } from '../types';
import { translations } from '../utils/translations';

interface FileUploaderProps {
  label: string;
  accept: string;
  file: File | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  fileTypeHint: FileType;
  className?: string;
  textValue: string;
  onTextChange: (text: string) => void;
  inputType: 'file' | 'text';
  onInputTypeChange: (type: 'file' | 'text') => void;
  lang: Language;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  label, 
  accept, 
  file, 
  onFileSelect, 
  onClear,
  fileTypeHint,
  className = "",
  textValue,
  onTextChange,
  inputType,
  onInputTypeChange,
  lang
}) => {
  const t = translations[lang];
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-2">
         <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
         <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
             <button
               onClick={() => onInputTypeChange('file')}
               className={`text-xs px-3 py-1 rounded-md transition-colors ${inputType === 'file' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
             >
                 {t.fileMode}
             </button>
             <button
               onClick={() => onInputTypeChange('text')}
               className={`text-xs px-3 py-1 rounded-md transition-colors ${inputType === 'text' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
             >
                 {t.textMode}
             </button>
         </div>
      </div>
      
      {inputType === 'file' ? (
          !file ? (
            <div 
              onClick={handleClick}
              className="flex-grow border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              <input 
                type="file" 
                ref={inputRef} 
                className="hidden" 
                accept={accept} 
                onChange={handleChange}
              />
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">{t.clickToUpload}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {fileTypeHint === FileType.AUDIO_OR_TEXT ? t.hintAudio : t.hintText}
              </span>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-center p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-md text-blue-600 dark:text-blue-400">
                        {file.type.startsWith('audio') ? <FileAudio className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{file.name}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                    </div>
                    <button 
                        onClick={onClear}
                        className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
          )
      ) : (
          <div className="flex-grow flex flex-col relative">
              <textarea
                  value={textValue}
                  onChange={(e) => onTextChange(e.target.value)}
                  placeholder={t.pasteContent}
                  className="w-full h-full p-3 text-sm text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-950 resize-none"
              />
              {textValue && (
                  <button 
                    onClick={() => onTextChange('')}
                    className="absolute top-2 right-2 rtl:right-auto rtl:left-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                    title="Clear text"
                  >
                      <X className="w-4 h-4" />
                  </button>
              )}
          </div>
      )}
    </div>
  );
};
