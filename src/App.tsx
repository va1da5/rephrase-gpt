import { useEffect, useRef, useState } from "react";

import { Button, message } from "antd";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

import useLocalStorage from "beautiful-react-hooks/useLocalStorage";
import Message, { MemoizedMessage } from "./Message";
import { MemoizedSidebar } from "./Sidebar";
import { ChatMessage, ContextHistory, Settings } from "./types";
import { actions, characters, formats, greets, models } from "./values";
import { MemoizedApiKey } from "./ApiKey";
import { MemoizedPromptInput } from "./PromptInput";
import { getQueryContext, registerHotKey } from "./utils";

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

  const handleLLMNewToken = (token: string) => {
    setStreamingMessage((current) => current + token);
  };

  const handleSend = async (prompt: string) => {
    if (!prompt.length || loading) return;

    const chat = new ChatOpenAI({
      openAIApiKey: settings?.apiKey,
      temperature: settings?.temperature,
      maxTokens: settings?.maxTokens,
      modelName: settings?.model as string,
      streaming: true,
      callbacks: [{ handleLLMNewToken }],
    });

    setMessages((current) => {
      return [...current, { role: "user", content: prompt }];
    });

    scrollToNew();

    setLoading(true);

    try {
      const response = await chat.call([
        new SystemChatMessage(
          settings?.action === "None"
            ? ""
            : await getQueryContext(
                settings,
                queryContextCache,
                setQueryContextCache
              )
        ),
        new HumanChatMessage(prompt),
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

  registerHotKey("ctrl+l", () => setMessages([]));

  return (
    <>
      {contextHolder}

      <div className="relative flex w-full">
        <MemoizedSidebar settings={settings} setSettings={setSettings} />
        <div className="relative ml-72 w-full">
          <div className="relative z-20 mx-auto max-w-4xl pb-[158px] pt-10 transition-all">
            <MemoizedApiKey settings={settings} setSettings={setSettings} />
            <div className="py-8">
              {messages
                .filter(
                  (message) => message.content && message.content?.length > 0
                )
                .map((message, index) => (
                  <MemoizedMessage key={index} message={message} />
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

          <MemoizedPromptInput
            onSend={handleSend}
            loading={loading}
            disabled={settings?.apiKey.length == 0}
          />
        </div>
      </div>
    </>
  );
}

export default App;
