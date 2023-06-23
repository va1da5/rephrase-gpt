import { useEffect, useRef, useState } from "react";

import { Button, Input, message } from "antd";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

import useLocalStorage from "beautiful-react-hooks/useLocalStorage";
import { useHotkeys } from "react-hotkeys-hook";
import Message from "./Message";
import Sidebar from "./Sidebar";
import { ChatMessage, Settings } from "./types";
import { HotkeyCallback } from "react-hotkeys-hook/dist/types";

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
    model: "gpt-3.5-turbo",
    style: [],
    tone: [],
    format: "default",
    action: "Rephrase",
    character: "None",
    maxTokens: 3000,
    temperature: 1,
    apiKey: "",
  });

  const bottomDiv = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    const welcome = `Hello! How may I assist you today?`;
    const missingApiKey =
      "Hello, please provide OpenAI API key before starting to use the tool";

    setMessages([
      {
        role: "assistant",
        content: !settings?.apiKey.length ? missingApiKey : welcome,
      },
    ]);
  }, []);

  const scrollToNew = () => {
    if (bottomDiv.current)
      bottomDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  const getQueryContext = () => {
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

    if (settings?.character != "None") {
      output += `. Answer as ${settings?.character} would do`;
    }

    if (settings?.format != "default") {
      output += `. ${settings?.format}`;
    }

    return (output += ".");
  };

  const handleLLMNewToken = (token: string) => {
    setMessages((current) => {
      const lastMessage = current.at(-1) as ChatMessage;

      return [
        ...current.slice(0, current.length - 1),
        {
          ...lastMessage,
          content: lastMessage?.content + token,
        },
      ];
    });
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
      setMessages((current) => {
        return [
          ...current,
          {
            role: "assistant",
            content: "",
          },
        ];
      });

      const response = await chat.call([
        new SystemChatMessage(
          settings?.action === "None" ? "" : getQueryContext()
        ),
        new HumanChatMessage(query),
      ]);

      setLoading(false);

      setMessages((current) => {
        return [
          ...current.slice(0, current.length - 1),
          {
            role: "assistant",
            content: response.text,
          },
        ];
      });

      setTimeout(scrollToNew, 500);
    } catch (error: any) {
      console.error(error.response.data.error);
      messageApi.open({
        type: "error",
        content: error.response.data.error.message,
      });

      setMessages((current) => {
        return [...current.slice(0, current.length - 1)];
      });
      setLoading(false);
      return;
    }
  };

  registerHotKey("shift+enter", handleSend);
  registerHotKey("ctrl+l", () => setMessages([]));
  registerHotKey("shift+delete", () => {
    setQuery("");
  });

  return (
    <>
      {contextHolder}

      <div className="relative flex w-full">
        <Sidebar settings={settings} setSettings={setSettings} />
        <div className="relative ml-72 w-full">
          <div className="relative z-20 mx-auto max-w-4xl pb-[158px] pt-10 transition-all">
            <div className="py-8">
              {messages
                .filter(
                  (message) => message.content && message.content?.length > 0
                )
                .map((message, index) => (
                  <Message key={index} message={message} />
                ))}

              <div ref={bottomDiv} className="my-10 flex justify-center">
                {messages.length > 1 && (
                  <div>
                    <Button
                      type="dashed"
                      title="Clear message history"
                      onClick={() => setMessages([])}
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
                />
                <Button
                  type="primary"
                  disabled={settings?.apiKey.length == 0}
                  loading={loading}
                  onClick={handleSend}
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
