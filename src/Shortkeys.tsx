import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSettingsContext } from "./context";
import { SettingsReducerAction } from "./state/SettingsReducer";
import { registerHotKey } from "./utils";

const shortcuts = [
  ["Ctrl L", "Clear chat history"],
  ["Ctrl P", "Toggle privacy filter"],
  ["Ctrl O", "Toggle language features"],
  ["Ctrl M", "Toggle Markdown output"],
  ["Ctrl B", "Toggle use of passive voice"],
  ["Ctrl Enter", "Submit prompt"],
  ["Ctrl Delete", "Clear prompt"],
];

export default function Shortkeys() {
  const { settings, dispatch } = useSettingsContext();

  registerHotKey("ctrl+p", () => {
    dispatch({
      type: SettingsReducerAction.SET_PRIVACY_FILTER_ENABLED,
      payload: !settings.privacyFilterEnabled,
    });
  });

  registerHotKey("ctrl+o", () => {
    dispatch({
      type: SettingsReducerAction.SET_LANGUAGE_FEATURES_ENABLED,
      payload: !settings.languageFeaturesEnabled,
    });
  });

  registerHotKey("ctrl+m", () => {
    dispatch({
      type: SettingsReducerAction.SET_MARKDOWN_OUTPUT,
      payload: !settings.markdownOutput,
    });
  });

  registerHotKey("ctrl+b", () => {
    dispatch({
      type: SettingsReducerAction.SET_USE_PASSIVE_VOICE,
      payload: !settings.usePassiveVoice,
    });
  });

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="main">
          <AccordionTrigger>
            <div className="text-lg font-bold text-gray-400">
              Keyboard Shortcuts
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-16 p-1">
              {shortcuts.map((item, index) => {
                return (
                  <div
                    className="my-3 flex justify-between text-gray-400"
                    key={index}
                  >
                    {<Keys combination={item[0]} />}
                    <span>{item[1]}</span>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function Keys({ combination }: { combination: string }) {
  return (
    <span>
      {combination
        .split(" ")
        .map<React.ReactNode>((key, index) => (
          <kbd
            key={`${key}-${index}`}
            className="cursor-pointer rounded-lg border border-zinc-600 bg-zinc-700 px-2 py-1.5 text-xs font-semibold text-gray-300"
          >
            {key}
          </kbd>
        ))
        .reduce((prev, curr) => [prev, " + ", curr])}
    </span>
  );
}
