import { FaRobot, FaUser } from "react-icons/fa";
import Markdown from "./Markdown";
import { ChatMessage } from "./types";
import clsx from "clsx";
import React from "react";

type Props = {
  message: ChatMessage;
};

export default function Message({ message }: Props) {
  return (
    <div className="mb-2 rounded-lg px-4">
      <div className="response-block group relative min-h-[52px] scroll-mt-32 rounded-md pl-14 pb-2 pt-2 pr-2 ">
        <div className="absolute top-2 left-2">
          <button className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-gray-200 text-gray-500 transition-all hover:bg-gray-300 active:bg-gray-200">
            {message.role == "user" ? <FaUser /> : <FaRobot />}
          </button>
        </div>
        <div className="w-full">
          <div
            className={clsx(
              "prose prose-slate prose-lg dark:prose-invert max-w-full",
              message.role == "user" && "opacity-50 hover:opacity-100"
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
