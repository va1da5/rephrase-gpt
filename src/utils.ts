import { HotkeyCallback, useHotkeys } from "react-hotkeys-hook";

export const registerHotKey = (key: string, fn: HotkeyCallback) => {
  return useHotkeys(key, fn, {
    enabled: true,
    preventDefault: true,
    enableOnFormTags: ["input", "textarea"],
  });
};
