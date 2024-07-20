import { HotkeyCallback, useHotkeys } from "react-hotkeys-hook";

export const registerHotKey = (key: string, fn: HotkeyCallback) => {
  return useHotkeys(key, fn, {
    enabled: true,
    preventDefault: true,
    enableOnFormTags: ["input", "textarea"],
  });
};

export const setPromptInput = (
  formRef: React.MutableRefObject<HTMLFormElement | null>,
  value: string
) => {
  if (formRef.current)
    (formRef.current.elements.namedItem("prompt") as HTMLInputElement).value =
      value;
};
