import { Rabbit } from "lucide-react";
import ConfigurationPresets from "./ConfigurationPresets";
import CustomSwitch from "./CustomSwitch";
import MultiOptions from "./MultiOptions";
import Options from "./Options";
import { useSettingsContext } from "./context";
import { SettingsReducerAction } from "./state/SettingsReducer";
import {
  languageActions,
  languageStyles,
  languageTones,
  outputFormats,
  pretendCharacters,
} from "./values";
import { Switch } from "./components/ui/switch";

type SidebarProps = {};

export default function LeftSidebar({}: SidebarProps) {
  const { settings, dispatch } = useSettingsContext();

  return (
    <div className="mt-5 flex w-full flex-col gap-4 px-4 ">
      <h1 className="flex w-full items-center gap-2 bg-gradient-to-r from-fuchsia-400 to-indigo-500 bg-clip-text text-3xl font-medium text-transparent">
        <Rabbit className="inline-block text-fuchsia-400" />{" "}
        <span>RephraseGPT</span>
      </h1>

      <div className="flex content-center items-center justify-between">
        <div className="text-lg font-bold text-gray-300">Language Features</div>
        <Switch
          checked={settings.languageFeaturesEnabled}
          className="data-[state=checked]:bg-zinc-200 data-[state=unchecked]:bg-zinc-600"
          onCheckedChange={(checked) =>
            dispatch({
              type: SettingsReducerAction.SET_LANGUAGE_FEATURES_ENABLED,
              payload: checked,
            })
          }
        />
      </div>

      <Options
        disabled={!settings.languageFeaturesEnabled}
        label="Action"
        options={languageActions}
        value={settings.action}
        onValueChange={(value) => {
          dispatch({
            type: SettingsReducerAction.SET_ACTION,
            payload: value,
          });
        }}
      />

      <MultiOptions
        disabled={!settings.languageFeaturesEnabled}
        label="Language Style"
        options={languageStyles.map((value) => ({ label: value, value }))}
        value={settings.style.map((value) => ({ label: value, value }))}
        onChange={(newValues) => {
          dispatch({
            type: SettingsReducerAction.SET_STYLES,
            payload: newValues.map(({ value }) => value),
          });
        }}
      />

      <MultiOptions
        disabled={!settings.languageFeaturesEnabled}
        label="Language Tone"
        options={languageTones.map((value) => ({ label: value, value }))}
        value={settings.tone.map((value) => ({ label: value, value }))}
        onChange={(newValues) => {
          dispatch({
            type: SettingsReducerAction.SET_TONES,
            payload: newValues.map(({ value }) => value),
          });
        }}
      />

      <Options
        disabled={!settings.languageFeaturesEnabled}
        label="Imitate Character"
        options={pretendCharacters.map((value) => ({ label: value, value }))}
        value={settings.character}
        onValueChange={(value) => {
          dispatch({
            type: SettingsReducerAction.SET_CHARACTER,
            payload: value,
          });
        }}
      />

      <Options
        disabled={!settings.languageFeaturesEnabled}
        label="Output Format"
        options={outputFormats}
        value={settings.format}
        onValueChange={(value) => {
          dispatch({
            type: SettingsReducerAction.SET_FORMAT,
            payload: value,
          });
        }}
      />

      <CustomSwitch
        disabled={!settings.languageFeaturesEnabled}
        label="Use Passive Voice"
        checked={settings.usePassiveVoice}
        onCheckedChange={(checked) =>
          dispatch({
            type: SettingsReducerAction.SET_USE_PASSIVE_VOICE,
            payload: checked,
          })
        }
      />
      <div className="mt-2">
        <ConfigurationPresets />
      </div>
    </div>
  );
}
