import Sidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Chat from "./Chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsContext } from "./context";
import { useState } from "react";
import { Settings } from "./types";
import {
  gptModels,
  languageActions,
  outputFormats,
  pretendCharacters,
} from "./values";

export default function App() {
  const [settings, setSettings] = useState<Settings>({
    languageFeaturesEnabled: true,
    model: gptModels[0],
    style: ["Casual", "Inclusive"],
    tone: ["Calm", "Friendly"],
    format: outputFormats[0].value,
    action: languageActions[2],
    character: pretendCharacters[0],
    usePassiveVoice: true,
    maxTokens: 3000,
    temperature: 0.3,
    apiKey: "",
    aiConsultantId: 0,
    privacyFilterEnabled: true,
  });

  return (
    <>
      <SettingsContext.Provider value={settings}>
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
