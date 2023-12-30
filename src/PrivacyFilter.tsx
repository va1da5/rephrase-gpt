import { Button } from "@/components/ui/button";
import ItemsPool from "./ItemsPool";
import { Switch } from "./components/ui/switch";
import { useSettingsContext } from "./context";

type Props = {};

export default function PrivacyFilter({}: Props) {
  const settings = useSettingsContext();
  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-300">Privacy Filter</div>
        <Switch
          checked={settings.privacyFilterEnabled}
          className="data-[state=checked]:bg-zinc-200 data-[state=unchecked]:bg-zinc-600"
        />
      </div>

      <div className="text-sm text-gray-400">
        Prevents specific keywords from reaching the OpenAI inference API
      </div>

      <Button className="bg-zinc-700 transition-all duration-300 hover:bg-zinc-500">
        Add
      </Button>

      <ItemsPool
        label="Keywords"
        values={[
          "AWS",
          "VPC",
          "GCP",
          "CyberArk",
          "Vault",
          "EC2",
          "GCP",
          "CyberArk",
          "Vault",
          "EC2",
          "GCP",
          "CyberArk",
          "Vault",
          "EC2",
          "EC2",
          "GCP",
          "CyberArk",
          "Vault",
          "EC2",
          "GCP",
          "CyberArk",
          "Vault",
          "EC2",
          "EC2",
          "GCP",
          "CyberArk",
          "Vault",
          "EC2",
          "GCP",
          "CyberArk",
          "Vault",
          "EC2",
        ].map((label) => ({
          label,
          value: label,
        }))}
      />
    </div>
  );
}
