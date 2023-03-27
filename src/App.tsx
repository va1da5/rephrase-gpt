import { useEffect, useRef, useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";

import { Button, Input } from "antd";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import Sidebar from "./Sidebar";
import useLocalStorage from "beautiful-react-hooks/useLocalStorage";
import { Message, Settings } from "./types";
import { useHotkeys } from "react-hotkeys-hook";

const { TextArea } = Input;

function App() {
  const [settings, setSettings] = useLocalStorage<Settings>("__settings", {
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

  const [messages, setMessages] = useState<Message[]>([]);

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
    let output = `${settings?.action} the text below`;

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

  const handleSend = async () => {
    if (!query.length) return;

    const configuration = new Configuration({
      apiKey: settings?.apiKey,
    });

    const openai = new OpenAIApi(configuration);

    setMessages((current) => {
      return [...current, { role: "user", content: query }];
    });

    scrollToNew();

    const messages: ChatCompletionRequestMessage[] = [];

    if (settings?.action !== "None")
      messages.push({
        role: "system",
        content: getQueryContext(),
      });

    messages.push({
      role: "user",
      content: query,
    });

    setLoading(true);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 3000,
      temperature: 1.5,
      messages,
    });

    setLoading(false);

    setMessages((current) => {
      return [
        ...current,
        {
          role: completion?.data?.choices[0]?.message?.role || "",
          content: completion?.data?.choices[0]?.message?.content || "",
        },
      ];
    });

    setTimeout(scrollToNew, 500);
  };

  useHotkeys("ctrl+enter", handleSend);

  return (
    <div className="relative flex w-full">
      <Sidebar settings={settings} setSettings={setSettings} />
      <div className="relative ml-72 w-full">
        <div className="relative z-20 mx-auto max-w-4xl pb-[158px] pt-10 transition-all">
          <div className="py-8">
            {messages.map((message, index) => {
              return (
                <div key={index} className="mb-2 rounded-lg px-4">
                  <div className="response-block group relative min-h-[52px] scroll-mt-32 rounded-md pl-14 pb-2 pt-2 pr-2 hover:bg-gray-50 dark:hover:bg-zinc-900">
                    <div className="absolute top-2 left-2">
                      <button className="flex h-9 w-9 flex-none  items-center justify-center rounded-md bg-gray-200 text-gray-500 transition-all hover:bg-gray-300 active:bg-gray-200">
                        {message.role == "user" ? <FaUser /> : <FaRobot />}
                      </button>
                    </div>
                    <div className="w-full">
                      <div className="prose prose-sm dark:prose-invert max-w-full">
                        {message.content.split("\n").map(
                          (content, index) =>
                            content.length > 0 && (
                              <p key={index} className="my-5">
                                {content}
                              </p>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomDiv} />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-30 ml-72 bg-white pb-5 pt-5 transition-all duration-300 dark:bg-zinc-800">
          <div className="mx-auto w-full max-w-4xl transition-all">
            <div className="flex items-end gap-1 px-4 pb-4 pt-0 transition-colors ">
              <TextArea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Your query goes here..."
                autoSize
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
  );
}

export default App;
