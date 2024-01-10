import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { registerHotKey } from "./utils";
import React from "react";

type Props = {
  onSend: (prompt: string) => void;
  loading: boolean;
  disabled: boolean;
};

export default function PromptInput({ onSend, loading, disabled }: Props) {
  const [prompt, setprompt] = useState("");

  registerHotKey("ctrl+enter", () => {
    onSend(prompt);
  });
  registerHotKey("ctrl+delete", () => {
    setprompt("");
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 ml-72 bg-white pb-5 pt-5 transition-all duration-300">
      <div className="mx-auto w-full max-w-4xl transition-all">
        <div className="flex items-end gap-1 px-4 pb-4 pt-0 transition-colors ">
          <TextArea
            value={prompt}
            onChange={(e) => setprompt(e.target.value)}
            placeholder="Your query goes here..."
            autoSize={{ minRows: 1, maxRows: 6 }}
            onKeyDownCapture={(e) => {
              if (e.code != "Enter" || e.shiftKey) return;

              if (prompt.length && prompt.split("\n").length < 2) {
                e.preventDefault();
                alert(1);
                return onSend(prompt);
              }
            }}
          />
          <Button
            type="primary"
            disabled={disabled}
            loading={loading}
            onClick={() => {
              onSend(prompt);
            }}
            className="bg-blue-600 text-white"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export const MemoizedPromptInput = React.memo(PromptInput);
