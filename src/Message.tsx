import { ChatCompletionRequestMessage } from "openai";
import { FaRobot, FaUser } from "react-icons/fa";
import Markdown from "./Markdown";

type Props = {
  message: ChatCompletionRequestMessage;
};

export default function Message({ message }: Props) {
  return (
    <div className="mb-2 rounded-lg px-4">
      <div className="response-block group relative min-h-[52px] scroll-mt-32 rounded-md pl-14 pb-2 pt-2 pr-2 hover:bg-gray-50 dark:hover:bg-zinc-900">
        <div className="absolute top-2 left-2">
          <button className="flex h-9 w-9 flex-none  items-center justify-center rounded-md bg-gray-200 text-gray-500 transition-all hover:bg-gray-300 active:bg-gray-200">
            {message.role == "user" ? <FaUser /> : <FaRobot />}
          </button>
        </div>
        <div className="w-full">
          <div className="prose prose-sm dark:prose-invert max-w-full">
            <Markdown children={message.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
