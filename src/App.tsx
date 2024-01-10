import Sidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Chat from "./Chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsContext } from "./context";
import { useEffect, useReducer } from "react";
import { settingsReducer } from "./state/SettingsReducer";
import { defaultSettings } from "./state/Settings";
import { localStorageSettingsKeyName } from "./values";

function getInitialSettings() {
  const savedState = localStorage.getItem(localStorageSettingsKeyName);
  if (savedState) return JSON.parse(savedState);
  return defaultSettings;
}

export default function App() {
  const [settings, dispatch] = useReducer(
    settingsReducer,
    getInitialSettings()
  );

  useEffect(() => {
    localStorage.setItem(localStorageSettingsKeyName, JSON.stringify(settings));
  }, [settings]);

  return (
    <>
      <SettingsContext.Provider value={{ settings, dispatch }}>
        <div className="grid h-dvh grid-cols-12">
          <ScrollArea className="col-span-2 h-dvh  bg-zinc-800">
            <Sidebar />
          </ScrollArea>

          <Chat />

          <ScrollArea className="col-span-2 h-dvh overflow-y-auto bg-zinc-800">
            <RightSidebar />
          </ScrollArea>
        </div>
      </SettingsContext.Provider>
    </>
  );
}
