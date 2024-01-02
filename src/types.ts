export type ChatMessage = {
  role: string;
  content: string;
};

export type ContextHistory = {
  [hash: string]: string;
};
