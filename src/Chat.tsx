import { ScrollArea } from "./components/ui/scroll-area";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { useSettingsContext } from "./context";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./types";
import { greets } from "./values";
import Message, { MemoizedMessage } from "./Message";
import { inference } from "./services";
import { cn } from "./lib/utils";
import { registerHotKey } from "./utils";

export default function Chat() {
  registerHotKey("ctrl+l", () => setMessages([]));
  registerHotKey("ctrl+enter", () => {
    handleSubmit();
  });
  registerHotKey("ctrl+delete", () => {
    if (formRef.current)
      (formRef.current.elements.namedItem("prompt") as HTMLInputElement).value =
        "";
  });

  const { settings } = useSettingsContext();
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingMessage, setStreamingMessage] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const bottomDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          settings?.apiKey && !settings?.apiKey.length
            ? greets.missingApiKey
            : greets.welcome,
      },
    ]);
  }, []);

  useEffect(() => {
    setStreamingMessage("");
  }, [loading]);

  function scrollToView() {
    setLoading((current) => {
      if (!current) return current;

      if (bottomDivRef.current) {
        bottomDivRef.current.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(scrollToView, 400);
      return current;
    });
  }

  function handleSubmit() {
    setLoading(true);
    scrollToView();

    setMessages((current) => [
      ...current,
      { role: "user", content: getPromptValue() },
    ]);

    inference({
      settings,
      prompt: getPromptValue(),
      streamHandler(token) {
        setStreamingMessage((current) => current + token);
      },
      messageHandler(message) {
        setLoading(false);
        setMessages((current) => {
          return [
            ...current,
            {
              role: "assistant",
              content: message,
            },
          ];
        });
      },
    });
  }

  function getPromptValue(): string {
    if (formRef.current)
      return (formRef.current.elements.namedItem("prompt") as HTMLInputElement)
        ?.value;

    return "";
  }

  return (
    <div className=" col-span-8 grid h-dvh grid-cols-1 grid-rows-[minmax(0,_1fr)_auto]">
      <ScrollArea className="h-full overflow-y-auto p-10">
        {messages
          .filter((message) => message.content && message.content?.length > 0)
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

        <div ref={bottomDivRef} className="my-10 flex justify-center">
          {messages.length > 1 && (
            <div>
              <Button
                variant="outline"
                title="Clear message history"
                onClick={() => setMessages([])}
                className="text-slate-500 [&>span]:select-none"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      <div>
        <form
          ref={formRef}
          className="flex items-end gap-3 p-10"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Textarea
            placeholder="Your query goes here..."
            name="prompt"
            onKeyDownCapture={(event) => {
              if (event.code != "Enter" || event.shiftKey) return;

              const prompt = getPromptValue();

              if (prompt.length && prompt.split("\n").length < 2) {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            type="submit"
            disabled={loading}
            className={cn(loading && "animate-pulse")}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
