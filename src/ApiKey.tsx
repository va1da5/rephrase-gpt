import { Button } from "@/components/ui/button";
import { useSettingsContext } from "./context";
import { cn } from "@/lib/utils";

type Props = {};

export default function ApiKey({}: Props) {
  const { settings, dispatch } = useSettingsContext();
  return (
    <div>
      <Button className="relative flex w-full items-center bg-zinc-700 px-10 transition-all duration-300 hover:bg-zinc-500">
        <span
          className={cn(
            "absolute left-5 me-3 flex h-3 w-3 rounded-full",
            settings.apiKey.length
              ? "bg-green-600"
              : "animate-pulse bg-red-500 shadow-sm shadow-red-800 ease-in-out"
          )}
        ></span>
        <span>🔑 OpenAI API Key</span>
      </Button>
    </div>
  );
}
