import Options from "./Options";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ApiKey from "./ApiKey";
import PrivacyFilter from "./PrivacyFilter";
import { aiConsultants, gptModels } from "./values";
import { useSettingsContext } from "./context";

type Props = {};

export default function RightSidebar({}: Props) {
  const settings = useSettingsContext();

  return (
    <div className="mt-5 flex h-full flex-col px-4">
      <div className="flex w-full flex-col gap-5">
        <ApiKey />

        <Options
          label="GPT Model"
          options={gptModels.map((value) => ({ label: value, value }))}
          value={settings.model}
        />

        <Options
          label="AI Consultant"
          options={aiConsultants}
          value={aiConsultants[settings.aiConsultantId].value}
        />

        <div className="grid w-full max-w-sm items-center gap-1.5 text-white">
          <Label htmlFor="max-tokens">Max Tokens</Label>
          <Input
            value={settings.maxTokens}
            id="max-tokens"
            placeholder="Max tokens"
            type="text"
            pattern="[0-9]*"
            className="border-zinc-500 bg-zinc-800 text-base text-white transition-all duration-100 focus-visible:ring-offset-1"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="temperature" className="text-white">
            Temperature
          </Label>
          <Slider
            value={[settings.temperature]}
            id="temperature"
            max={2}
            step={0.1}
          />

          <PrivacyFilter />
        </div>
      </div>
    </div>
  );
}
