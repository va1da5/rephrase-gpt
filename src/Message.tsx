import { FaRobot, FaUser } from "react-icons/fa";
import Markdown from "./Markdown";
import { ChatMessage } from "./types";
import React from "react";
import { cn } from "./lib/utils";

type Props = {
  message: ChatMessage;
};

export default function Message({ message }: Props) {
  return (
    <div className="mb-2 rounded-lg px-4">
      <div className="response-block group relative min-h-[52px] scroll-mt-32 rounded-md pb-2 pl-14 pr-2 pt-2 ">
        <div className="absolute left-2 top-2">
          <button className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-gradient-to-t from-slate-300 to-slate-100 text-gray-500 transition-all hover:bg-gray-300 active:bg-gray-200">
            {message.role == "user" ? <FaUser /> : <FaRobot />}
          </button>
        </div>
        <div className="w-full">
          <div
            className={cn(
              "prose prose-lg prose-slate max-w-full transition-opacity duration-100 dark:prose-invert hover:opacity-100",
              message.role == "user" && "opacity-50 "
            )}
          >
            <Markdown children={message.content} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const MemoizedMessage = React.memo(Message);
