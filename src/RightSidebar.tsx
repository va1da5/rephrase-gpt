import Options from "./Options";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ApiKey from "./ApiKey";
import PrivacyFilter from "./PrivacyFilter";
import { aiConsultants, gptModels } from "./values";
import { useSettingsContext } from "./context";
import { SettingsReducerAction } from "./state/SettingsReducer";
import CustomSwitch from "./CustomSwitch";

export default function RightSidebar() {
  const { settings, dispatch } = useSettingsContext();

  return (
    <div className="mt-8 flex h-full flex-col px-4">
      <div className="flex w-full flex-col gap-5">
        <ApiKey />

        <Options
          label="GPT Model"
          options={gptModels.map((value) => ({ label: value, value }))}
          value={settings.model}
          onValueChange={(value) => {
            dispatch({
              type: SettingsReducerAction.SET_MODEL,
              payload: value,
            });
          }}
        />

        <Options
          label="AI Consultant"
          options={aiConsultants}
          value={aiConsultants[settings.aiConsultantId].value}
          onValueChange={(value) => {
            dispatch({
              type: SettingsReducerAction.SET_AI_CONSULTANT,
              payload: aiConsultants.map((item) => item.value).indexOf(value),
            });
          }}
        />

        <div className="grid w-full max-w-sm items-center gap-1.5 text-white">
          <Label htmlFor="max-tokens">Max Tokens</Label>
          <Input
            value={settings.maxTokens}
            onChange={(event) => {
              dispatch({
                type: SettingsReducerAction.SET_MAX_TOKENS,
                payload: event.target.value,
              });
            }}
            id="max-tokens"
            placeholder="Max tokens"
            type="text"
            className="border-zinc-500 bg-zinc-800 text-base text-white transition-all duration-100 focus-visible:ring-offset-1"
          />
        </div>

        <CustomSwitch
          checked={settings.markdownOutput}
          label="Markdown Output"
          onCheckedChange={(checked) =>
            dispatch({
              type: SettingsReducerAction.SET_MARKDOWN_OUTPUT,
              payload: checked,
            })
          }
        />

        <div className="flex flex-col gap-3">
          <Label
            htmlFor="temperature"
            className="flex justify-between text-white"
          >
            <span>Temperature</span>
            <span>{settings.temperature}</span>
          </Label>
          <Slider
            value={[settings.temperature]}
            id="temperature"
            max={2}
            step={0.1}
            onValueChange={([value]) => {
              dispatch({
                type: SettingsReducerAction.SET_TEMPERATURE,
                payload: value,
              });
            }}
          />

          <div className="text-sm text-gray-400">
            Temperature affects output randomness
          </div>
          <PrivacyFilter />
        </div>
      </div>
    </div>
  );
}
