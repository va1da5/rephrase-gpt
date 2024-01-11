export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ContextHistory = {
  [hash: string]: string;
};
