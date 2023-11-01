export type Settings = {
  model: string;
  style: string[];
  tone: string[];
  format: string;
  action: string;
  character: string;
  maxTokens: number;
  temperature: number;
  apiKey: string;
};

export type ChatMessage = {
  role: string;
  content: string;
};

export type ContextHistory = {
  [hash: string]: string;
};
