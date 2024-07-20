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
          <ScrollArea className="col-span-5 h-dvh bg-zinc-800 sm:col-span-5 lg:col-span-3 2xl:col-span-2">
            <Sidebar />
            <div className="mb-12 w-full sm:block lg:hidden">
              <RightSidebar />
            </div>
          </ScrollArea>

          <Chat className="col-span-7 grid h-dvh grid-cols-1 grid-rows-[minmax(0,_1fr)_auto] lg:col-span-7 2xl:col-span-8" />

          <ScrollArea className="hidden h-dvh overflow-y-auto bg-zinc-800 sm:col-span-4 sm:hidden lg:col-span-2 lg:block">
            <RightSidebar />
          </ScrollArea>
        </div>
      </SettingsContext.Provider>
    </>
  );
}
