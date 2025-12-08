
export interface EpisodeState {
  id: number;
  seriesName: string;
  title: string;
  serialNumber: string;
  date: string;
  
  // Raw Input (Summary Source)
  rawFile: File | null;
  rawTextInput: string;
  rawInputMode: 'file' | 'text';
  youtubeLink: string;
  
  summaryPrompt: string;
  rawSummary: string;
  isProcessingSummary: boolean;
  
  // Script Input (Refinement Source)
  scriptFile: File | null;
  scriptTextInput: string;
  scriptInputMode: 'file' | 'text';
  
  scriptPrompt: string;
  refinedScript: string;
  isProcessingScript: boolean;
  
  summaryError?: string;
  scriptError?: string;
}

export enum FileType {
  AUDIO_OR_TEXT = 'AUDIO_OR_TEXT',
  TEXT_ONLY = 'TEXT_ONLY'
}

export interface ProcessingOptions {
  summaryPrompt: string;
  refinementPrompt: string;
}

export type Language = 'en' | 'ar';
