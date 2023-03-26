export type Settings = {
  style: string[];
  tone: string[];
  format: string;
  action: string;
  character: string;
  maxTokens: number;
  temperature: number;
  apiKey: string;
};

export type Message = {
  role: string;
  content: string;
};
