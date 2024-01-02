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

type SidebarProps = {};

export default function LeftSidebar({}: SidebarProps) {
  const { settings, dispatch } = useSettingsContext();

  return (
    <div className="mt-5 flex w-full flex-col gap-4 px-4">
      <h1 className="w-full text-center text-4xl text-white">🐙 RephraseGPT</h1>

      <CustomSwitch
        checked={settings.languageFeaturesEnabled}
        label="Language Features"
        onCheckedChange={(checked) =>
          dispatch({
            type: SettingsReducerAction.SET_LANGUAGE_FEATURES_ENABLED,
            payload: checked,
          })
        }
      />

      <MultiOptions
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
        label="Output Format"
        options={outputFormats.map(({ label, value }) => ({ label, value }))}
        value={settings.format}
        onValueChange={(value) => {
          dispatch({
            type: SettingsReducerAction.SET_FORMAT,
            payload: value,
          });
        }}
      />

      <Options
        label="Action"
        options={languageActions.map((value) => ({ label: value, value }))}
        value={settings.action}
        onValueChange={(value) => {
          dispatch({
            type: SettingsReducerAction.SET_ACTION,
            payload: value,
          });
        }}
      />

      <CustomSwitch
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
