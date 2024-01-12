import { ChatOpenAI } from "langchain/chat_models/openai";
import { Settings } from "./state/Settings";
import { HumanMessage, SystemMessage } from "langchain/schema";
import {
  localStorageQueryContextCacheKeyName,
  queryContextTuningInstruction,
} from "./values";
import md5 from "md5";

type inferenceProps = {
  settings: Settings;
  prompt: string;
  streamHandler: (token: string) => void;
};

export async function fixQueryContext(settings: Settings, context: string) {
  const chat = new ChatOpenAI({
    openAIApiKey: settings?.apiKey,
    temperature: 0.2,
    maxTokens: 512,
    modelName: "gpt-3.5-turbo",
    streaming: false,
  });

  const response = await chat.call([
    new SystemMessage(queryContextTuningInstruction),
    new HumanMessage(`"${context}"`),
  ]);

  return (response.content as string).replace(/"+/g, "");
}

export async function inference({
  settings,
  prompt,
  streamHandler,
}: inferenceProps): Promise<string> {
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
      new SystemMessage((await makeQueryContext(settings)) as string), // SystemMessage
      new HumanMessage(prompt),
    ]);

    return response.content as string;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

function makeLanguageQueryContext(settings: Settings) {
  let context = `${settings.action} the following text`;

  if (settings.style.length) {
    context += ` while also ensuring ${settings?.style
      ?.join(", ")
      .toLowerCase()} language style${settings?.style?.length > 1 ? "s" : ""}`;
  }

  if (settings.tone.length) {
    context += ` ${settings.style?.length ? "and" : "ensuring"} ${settings?.tone
      ?.join(", ")
      .toLowerCase()} tone${settings?.tone?.length > 1 ? "s" : ""}`;
  }

  context += ". ";

  if (settings.character.toLocaleLowerCase() != "none") {
    context += `Format output in a style as ${settings.character} would do. `;
  }

  if (settings.format.toLowerCase() != "default") {
    context += `${settings.format}. `;
  }

  if (settings.usePassiveVoice) {
    context += `Use passive voice in the answer.`;
  }

  return context;
}

async function makeQueryContext(settings: Settings) {
  let context = "";

  if (settings.languageFeaturesEnabled)
    context = makeLanguageQueryContext(settings);

  if (settings.markdownOutput) context += " Format content in Markdown.";

  console.log(context);

  let cachedContext = getFromCache(context);

  if (!cachedContext) {
    cachedContext = await fixQueryContext(settings, context);
    setCache(context, cachedContext);
  }

  console.log(`Updated: ${cachedContext}`);

  return cachedContext;
}

function getFromCache(context: string): string | undefined {
  const storedCache = localStorage.getItem(
    localStorageQueryContextCacheKeyName
  );

  if (!storedCache) return;

  const cache = JSON.parse(storedCache);
  const hash = md5(context);

  if (cache?.[hash] !== undefined) return cache[hash];
  return;
}

function setCache(context: string, finalContext: string) {
  let storedCache = localStorage.getItem(localStorageQueryContextCacheKeyName);

  if (!storedCache) storedCache = "{}";

  const cache = JSON.parse(storedCache);

  cache[md5(context)] = finalContext;

  localStorage.setItem(
    localStorageQueryContextCacheKeyName,
    JSON.stringify(cache)
  );
}
