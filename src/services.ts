import { ChatOpenAI } from "langchain/chat_models/openai";
import { Settings } from "./state/Settings";
import { HumanMessage, SystemMessage } from "langchain/schema";

type inferenceProps = {
  settings: Settings;
  prompt: string;
  streamHandler: (token: string) => void;
  messageHandler: (message: string) => void;
};

export async function inference({
  settings,
  prompt,
  streamHandler,
  messageHandler,
}: inferenceProps) {
  const chat = new ChatOpenAI({
    openAIApiKey: settings?.apiKey,
    temperature: settings?.temperature,
    maxTokens: settings?.maxTokens,
    modelName: settings?.model as string,
    streaming: true,
    callbacks: [{ handleLLMNewToken: streamHandler }],
  });

  try {
    const response = await chat.call([
      new SystemMessage(!settings.languageFeaturesEnabled ? "" : ""),
      new HumanMessage(prompt),
    ]);

    messageHandler(response.content as string);
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
