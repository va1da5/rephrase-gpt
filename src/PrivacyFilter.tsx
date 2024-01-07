import { Button } from "@/components/ui/button";
import ItemsPool from "./ItemsPool";
import { Switch } from "@/components/ui/switch";
import { useSettingsContext } from "./context";
import { SettingsReducerAction } from "./state/SettingsReducer";
import { useState } from "react";
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

type Props = {};

export default function PrivacyFilter({}: Props) {
  const { settings, dispatch } = useSettingsContext();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  function addKeywords(input: string) {
    dispatch({
      type: SettingsReducerAction.SET_PRIVACY_KEYWORDS,
      payload: [...parseKeywords(input), ...settings.privacyKeywords],
    });
  }

  function parseKeywords(input: string): string[] {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-300">Privacy Filter</div>
        <Switch
          checked={settings.privacyFilterEnabled}
          className="data-[state=checked]:bg-zinc-200 data-[state=unchecked]:bg-zinc-600"
          onCheckedChange={(checked) =>
            dispatch({
              type: SettingsReducerAction.SET_PRIVACY_FILTER_ENABLED,
              payload: checked,
            })
          }
        />
      </div>

      <div className="text-sm text-gray-400">
        Prevents specific keywords from reaching the OpenAI inference API
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-zinc-700 transition-all duration-300 hover:bg-zinc-500">
            Add
          </Button>
        </DialogTrigger>
        <DialogContent className="top-[25%] sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>🙈 Add Sensitive Keywords</DialogTitle>
            <br />
            <DialogDescription>
              The keywords you enter will be stored locally in your browser and
              not shared with any external servers. When sending a request to
              the OpenAI inference API, your sensitive keywords will be replaced
              with random data to protect your privacy. To further enhance
              privacy, the values used for this process will be regularly
              changed to prevent any context from being built in the OpenAI
              API's backend.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Input
              placeholder="Comma separated list of sensitive keywords"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={parseKeywords(input).length < 1}
              onClick={() => {
                addKeywords(input);
                setOpen(false);
                setInput("");
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {settings.privacyKeywords.length > 0 && (
        <ItemsPool
          label="Keywords"
          values={settings.privacyKeywords.map((label) => ({
            label,
            value: label,
          }))}
          onRemove={(idx) => {
            dispatch({
              type: SettingsReducerAction.SET_PRIVACY_KEYWORDS,
              payload: settings.privacyKeywords.filter(
                (_, index) => idx != index
              ),
            });
          }}
        />
      )}
    </div>
  );
}
