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
import { registerHotKey, setPromptInput } from "./utils";

export default function Chat({ className }: { className: string }) {
  registerHotKey("ctrl+l", () => setMessages([]));
  registerHotKey("ctrl+enter", () => {
    handleSubmit();
  });
  registerHotKey("ctrl+delete", () => {
    setPromptInput(formRef, "");
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
          settings?.apiKey != undefined && !settings?.apiKey.length
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

  async function handleSubmit() {
    let prompt = getPromptValue();

    if (!prompt.trim().length) return;

    setLoading(true);
    scrollToView();

    setMessages((current) => [...current, { role: "user", content: prompt }]);
    setPromptInput(formRef, "");

    const response = await inference({
      settings,
      prompt: settings.languageFeaturesEnabled ? `"${prompt}"` : prompt,
      streamHandler(token) {
        setStreamingMessage((current) => current + token);
      },
    });
    setLoading(false);
    setMessages((current) => {
      return [
        ...current,
        {
          role: "assistant",
          content: response,
        },
      ];
    });
  }

  function loadLastPrompt() {
    if (!messages) return;
    const user = messages.filter((mgs) => mgs.role == "user");
    if (user.length) {
      setPromptInput(formRef, user.at(-1)?.content as string);
    }
  }

  function getPromptValue(): string {
    if (formRef.current)
      return (formRef.current.elements.namedItem("prompt") as HTMLInputElement)
        ?.value;

    return "";
  }

  return (
    <div className={className}>
      <ScrollArea className="h-full overflow-y-auto px-2 pt-2 sm:px-10 sm:pt-10">
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
          className="flex items-end gap-3 px-10 pb-10 pt-7"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Textarea
            placeholder="Your query goes here..."
            name="prompt"
            maxRows={10}
            onKeyDownCapture={(event) => {
              if (
                (event.code != "Enter" || event.shiftKey) &&
                event.key != "ArrowUp"
              )
                return;

              const prompt = getPromptValue();

              if (
                prompt.length &&
                prompt.split("\n").length < 2 &&
                event.code == "Enter"
              ) {
                event.preventDefault();
                handleSubmit();
              }

              if (!prompt.length && event.key == "ArrowUp") {
                loadLastPrompt();
              }
            }}
            className="shadow-md"
          />
          <Button
            type="submit"
            disabled={loading}
            variant={"default"}
            className={cn(loading && "animate-pulse", "bg-zinc-700")}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
