import { HotkeyCallback, useHotkeys } from "react-hotkeys-hook";
import { ContextHistory, Settings } from "./types";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import md5 from "md5";

export const registerHotKey = (key: string, fn: HotkeyCallback) => {
  return useHotkeys(key, fn, {
    enabled: true,
    preventDefault: true,
    enableOnFormTags: ["input", "textarea"],
  });
};

const getRawQueryContext = (settings: Settings | null) => {
  if (settings === null) return;
  let output = `${settings?.action.toLocaleLowerCase()} ${
    settings?.action == "Fix Grammar" ? "to" : ""
  } the following content`;

  if (settings?.style?.length) {
    output += ` ${settings.action == "Explain" ? "in" : "to"} ${settings?.style
      ?.join(", ")
      .toLowerCase()} language style${settings?.style?.length > 1 ? "s" : ""}`;
  }

  if (settings?.tone?.length) {
    output += ` ${settings.style?.length ? "and" : "in"} ${settings?.tone
      ?.join(", ")
      .toLowerCase()} tone${settings?.tone?.length > 1 ? "s" : ""}`;
  }

  if (settings?.character.toLocaleLowerCase() != "none") {
    output += `. Answer as ${settings?.character} would do`;
  }

  if (settings?.format.toLowerCase() != "default") {
    output += `. ${settings?.format}`;
  }

  return (output += ".");
};

export const getQueryContext = async (
  settings: Settings | null,
  queryContextCache: ContextHistory | null,
  setQueryContextCache: (fn: (ctx: ContextHistory) => ContextHistory) => void
) => {
  const chat = new ChatOpenAI({
    openAIApiKey: settings?.apiKey,
    temperature: 0.2,
    maxTokens: 500,
    modelName: "gpt-3.5-turbo",
  });

  const rawQueryContext = getRawQueryContext(settings);
  if (rawQueryContext === undefined) return "";
  const rawQueryContextHash = md5(rawQueryContext);

  if (queryContextCache?.[rawQueryContextHash] !== undefined)
    return queryContextCache[rawQueryContextHash];

  console.info(rawQueryContext);

  const promptContext = await chat.call([
    new SystemChatMessage(
      "Fix grammar to the following chat prompt context. Write in a passive voice meant for instructions"
    ),
    new HumanChatMessage(`"${getRawQueryContext(settings)}"`),
  ]);

  promptContext.text = promptContext.text.replace(/"+/g, "");

  console.info(promptContext.text);

  const tmp: { [hash: string]: string } = {};
  tmp[rawQueryContextHash] = promptContext.text;

  setQueryContextCache((current) => ({
    ...current,
    ...tmp,
  }));

  return promptContext.text;
};
