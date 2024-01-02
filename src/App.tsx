import Sidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Chat from "./Chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsContext } from "./context";
import { useReducer } from "react";
import { settingsReducer } from "./state/SettingsReducer";
import { defaultSettings } from "./state/Settings";

export default function App() {
  const [settings, dispatch] = useReducer(settingsReducer, defaultSettings);

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
