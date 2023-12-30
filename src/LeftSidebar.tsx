import ConfigurationPresets from "./ConfigurationPresets";
import CustomSwitch from "./CustomSwitch";
import MultiOptions from "./MultiOptions";
import Options from "./Options";
import { useSettingsContext } from "./context";
import {
  languageActions,
  languageStyles,
  languageTones,
  outputFormats,
  pretendCharacters,
} from "./values";

type SidebarProps = {};

export default function LeftSidebar({}: SidebarProps) {
  const settings = useSettingsContext();

  return (
    <div className="mt-5 flex w-full flex-col gap-4 px-4">
      <h1 className="w-full text-center text-4xl text-white">🐙 RephraseGPT</h1>

      <CustomSwitch
        checked={settings.languageFeaturesEnabled}
        label="Language Features"
      />

      <MultiOptions
        label="Language Style"
        options={languageStyles.map((value) => ({ label: value, value }))}
        value={settings.style.map((value) => ({ label: value, value }))}
      />

      <MultiOptions
        label="Language Tone"
        options={languageTones.map((value) => ({ label: value, value }))}
        value={settings.tone.map((value) => ({ label: value, value }))}
      />

      <Options
        label="Imitate Character"
        options={pretendCharacters.map((value) => ({ label: value, value }))}
        value={settings.character}
      />

      <Options
        label="Output Format"
        options={outputFormats.map(({ label, value }) => ({ label, value }))}
        value={settings.format}
      />

      <Options
        label="Action"
        options={languageActions.map((value) => ({ label: value, value }))}
        value={settings.action}
      />

      <CustomSwitch
        label="Use Passive Voice"
        checked={settings.usePassiveVoice}
      />
      <div className="mt-2">
        <ConfigurationPresets />
      </div>
    </div>
  );
}
