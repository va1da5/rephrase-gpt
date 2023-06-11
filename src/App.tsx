import { useEffect, useRef, useState } from "react";

import { Button, Input } from "antd";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import Sidebar from "./Sidebar";
import useLocalStorage from "beautiful-react-hooks/useLocalStorage";
import { Settings } from "./types";
import { useHotkeys } from "react-hotkeys-hook";
import Message from "./Message";

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

  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

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
          role: completion?.data?.choices[0]?.message?.role || "assistant",
          content: completion?.data?.choices[0]?.message?.content || "",
        },
      ];
    });

    setTimeout(scrollToNew, 500);
  };

  useHotkeys("shift+enter", handleSend);

  return (
    <div className="relative flex w-full">
      <Sidebar settings={settings} setSettings={setSettings} />
      <div className="relative ml-72 w-full">
        <div className="relative z-20 mx-auto max-w-4xl pb-[158px] pt-10 transition-all">
          <div className="py-8">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}

            <div ref={bottomDiv} className="my-10 flex justify-center">
              {messages.length > 2 && (
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

        <div className="fixed bottom-0 left-0 right-0 z-30 ml-72 bg-white pb-5 pt-5 transition-all duration-300 dark:bg-zinc-800">
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
  );
}

export default App;
