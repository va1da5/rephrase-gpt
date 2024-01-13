import React from "react";
import { Button } from "@/components/ui/button";
import { useSettingsContext } from "@/context";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SettingsReducerAction } from "./state/SettingsReducer";

type Props = {};

export default function ApiKey({}: Props) {
  const { settings, dispatch } = useSettingsContext();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  function isInputValid(string: string) {
    if (!string.length) return false;
    return /^sk-[\w\d]{48}$/.test(string);
  }

  function updateApiKey(key: string) {
    dispatch({
      type: SettingsReducerAction.SET_API_KEY,
      payload: input,
    });
  }

  function handleSubmit() {
    if (!isInputValid(input)) return;
    updateApiKey(input);
    setInput("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="relative flex w-full items-center bg-zinc-700 px-10 transition-all duration-300 hover:bg-zinc-500">
          <span
            className={cn(
              "absolute left-5 me-3 flex h-3 w-3 rounded-full",
              settings.apiKey?.length
                ? "bg-green-600"
                : "animate-pulse bg-red-500 shadow-sm shadow-red-800 ease-in-out"
            )}
          ></span>
          <span>🔑 OpenAI API Key</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[25%] sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>🔑 OpenAI API Key</DialogTitle>
          <br />
          <DialogDescription>
            The API key will be stored locally and only sent to OpenAI API.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              id="apikey"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </form>
          <p
            className={cn(
              "text-sm text-red-500",
              !isInputValid(input) && input.length ? "opacity-100" : "opacity-0"
            )}
          >
            Incorrect API key!
          </p>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!isInputValid(input)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
