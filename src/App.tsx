import { useEffect, useRef, useState } from "react";

import { Button, Input, message } from "antd";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

import useLocalStorage from "beautiful-react-hooks/useLocalStorage";
import { useHotkeys } from "react-hotkeys-hook";
import Message from "./Message";
import Sidebar from "./Sidebar";
import { ChatMessage, ContextHistory, Settings } from "./types";
import { HotkeyCallback } from "react-hotkeys-hook/dist/types";
import { actions, characters, formats, greets, models } from "./values";
import ApiKey from "./ApiKey";
import md5 from "md5";

const { TextArea } = Input;

const registerHotKey = (key: string, fn: HotkeyCallback) => {
  return useHotkeys(key, fn, {
    enabled: true,
    preventDefault: true,
    enableOnFormTags: ["input", "textarea"],
  });
};

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [settings, setSettings] = useLocalStorage<Settings>("__settings", {
    model: models[0],
    style: [],
    tone: [],
    format: formats[0].value,
    action: actions[0],
    character: characters[0],
    maxTokens: 3000,
    temperature: 0.2,
    apiKey: "",
  });

  const [queryContextCache, setQueryContextCache] =
    useLocalStorage<ContextHistory>("__queryContextCache", {});

  const bottomDiv = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingMessage, setStreamingMessage] = useState("");

  const [query, setQuery] = useState("");

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: !settings?.apiKey.length
          ? greets.missingApiKey
          : greets.welcome,
      },
    ]);
  }, []);

  const scrollToNew = () => {
    if (bottomDiv.current)
      bottomDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  const getRawQueryContext = () => {
    let output = `${settings?.action.toLocaleLowerCase()} ${
      settings?.action == "Fix Grammar" ? "to" : ""
    } the following content`;

    if (settings?.style?.length) {
      output += ` ${
        settings.action == "Explain" ? "in" : "to"
      } ${settings?.style?.join(", ").toLowerCase()} language style${
        settings?.style?.length > 1 ? "s" : ""
      }`;
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

  const handleLLMNewToken = (token: string) => {
    setStreamingMessage((current) => current + token);
  };

  const getQueryContext = async () => {
    const chat = new ChatOpenAI({
      openAIApiKey: settings?.apiKey,
      temperature: 0.2,
      maxTokens: 500,
      modelName: "gpt-3.5-turbo",
    });

    const rawQueryContext = getRawQueryContext();
    const rawQueryContextHash = md5(rawQueryContext);

    if (queryContextCache?.[rawQueryContextHash] !== undefined)
      return queryContextCache[rawQueryContextHash];

    console.info(rawQueryContext);

    const promptContext = await chat.call([
      new SystemChatMessage(
        "Fix grammar to the following chat prompt context. Write in a passive voice meant for instructions"
      ),
      new HumanChatMessage(`"${getRawQueryContext()}"`),
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

  const handleSend = async () => {
    if (!query.length || loading) return;

    const chat = new ChatOpenAI({
      openAIApiKey: settings?.apiKey,
      temperature: settings?.temperature,
      maxTokens: settings?.maxTokens,
      modelName: settings?.model as string,
      streaming: true,
      callbacks: [{ handleLLMNewToken }],
    });

    setMessages((current) => {
      return [...current, { role: "user", content: query }];
    });

    scrollToNew();

    setLoading(true);

    try {
      const response = await chat.call([
        new SystemChatMessage(
          settings?.action === "None" ? "" : await getQueryContext()
        ),
        new HumanChatMessage(query),
      ]);

      setStreamingMessage("");
      setMessages((current) => {
        return [
          ...current,
          {
            role: "assistant",
            content: response.text,
          },
        ];
      });

      setTimeout(scrollToNew, 500);
    } catch (error: any) {
      console.error(error);
      messageApi.open({
        type: "error",
        content: error?.response?.data?.error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  registerHotKey("ctrl+enter", handleSend);
  registerHotKey("ctrl+l", () => setMessages([]));
  registerHotKey("ctrl+delete", () => {
    setQuery("");
  });

  return (
    <>
      {contextHolder}

      <div className="relative flex w-full">
        <Sidebar settings={settings} setSettings={setSettings} />
        <div className="relative ml-72 w-full">
          <div className="relative z-20 mx-auto max-w-4xl pb-[158px] pt-10 transition-all">
            <ApiKey settings={settings} setSettings={setSettings} />
            <div className="py-8">
              {messages
                .filter(
                  (message) => message.content && message.content?.length > 0
                )
                .map((message, index) => (
                  <Message key={index} message={message} />
                ))}

              {streamingMessage.length > 0 && (
                <Message
                  message={{
                    role: "assistant",
                    content: streamingMessage,
                  }}
                />
              )}

              <div ref={bottomDiv} className="my-10 flex justify-center">
                {messages.length > 1 && (
                  <div>
                    <Button
                      type="dashed"
                      title="Clear message history"
                      onClick={() => setMessages([])}
                      className="text-slate-500 [&>span]:select-none"
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 ml-72 bg-white pb-5 pt-5 transition-all duration-300">
            <div className="mx-auto w-full max-w-4xl transition-all">
              <div className="flex items-end gap-1 px-4 pb-4 pt-0 transition-colors ">
                <TextArea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Your query goes here..."
                  autoSize={{ minRows: 1, maxRows: 6 }}
                  onKeyDownCapture={(e) => {
                    if (e.code != "Enter" || e.shiftKey) return;

                    if (query.length && query.split("\n").length < 2) {
                      e.preventDefault();
                      return handleSend();
                    }
                  }}
                />
                <Button
                  type="primary"
                  disabled={settings?.apiKey.length == 0}
                  loading={loading}
                  onClick={handleSend}
                  className="text-white bg-blue-600"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
