import { createContext, useContext } from "react";
import { Settings } from "./types";

export const SettingsContext = createContext<Settings | undefined>(undefined);

export function useSettingsContext(): Settings {
  const settings = useContext(SettingsContext);

  if (settings == undefined) {
    throw new Error("useSettingsContext must be used with a SettingsContext");
  }
  return settings;
}
