import { Dispatch, createContext, useContext } from "react";
import { Settings } from "./state/Settings";
import { SettingsAction } from "./state/SettingsReducer";

interface SettingsContextProps {
  settings: Settings;
  dispatch: Dispatch<SettingsAction>;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (context == undefined) {
    throw new Error("useSettingsContext must be used with a SettingsContext");
  }

  return context;
}
