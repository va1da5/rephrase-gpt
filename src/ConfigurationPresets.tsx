import { useState } from "react";
import { Button } from "./components/ui/button";
import ItemsPool from "./ItemsPool";
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
import { useSettingsContext } from "./context";
import { SettingsReducerAction } from "./state/SettingsReducer";

export default function ConfigurationPresets() {
  const { settings, dispatch } = useSettingsContext();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-lg font-bold text-gray-300">
          Configuration Presets
        </div>

        <div className="text-sm text-gray-400">
          Provides a convenient way to switch between different configurations
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-zinc-700 px-10 transition-all duration-300 hover:bg-zinc-500">
            Save Current
          </Button>
        </DialogTrigger>
        <DialogContent className="top-[25%] sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>📑 Create Configuration Snapshot</DialogTitle>
            <br />
            <DialogDescription>
              The snapshot feature captures the current configuration, enabling
              users to easily switch between different setups and perform tasks
              more efficiently.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Input
              placeholder="Name of the snapshot"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={input.length < 1}
              onClick={() => {
                dispatch({
                  type: SettingsReducerAction.ADD_CONFIGURATION_PRESETS,
                  payload: input.trim(),
                });
                setInput("");
                setOpen(false);
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {settings.configurationPresents &&
        settings.configurationPresents.length > 0 && (
          <ItemsPool
            label="Configurations"
            values={settings.configurationPresents.map(({ label }) => ({
              label,
              value: label,
            }))}
            onRemove={(idx) => {
              dispatch({
                type: SettingsReducerAction.REMOVE_CONFIGURATION_PRESETS,
                payload: idx,
              });
            }}
            onSelect={(idx) => {
              dispatch({
                type: SettingsReducerAction.RESTORE_CONFIGURATION_PRESETS,
                payload: idx,
              });
            }}
          />
        )}
    </div>
  );
}
