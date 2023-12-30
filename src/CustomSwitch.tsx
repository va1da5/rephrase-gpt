import { Switch } from "@/components/ui/switch";

type Props = {
  label: string;
  checked: boolean;
};

export default function CustomSwitch({ label, checked }: Props) {
  return (
    <div>
      <div className="flex flex-row content-center items-center justify-between">
        <div>
          <p className="pb-2 text-base text-white">{label}</p>
        </div>
        <div>
          <Switch
            checked={checked}
            className="data-[state=checked]:bg-zinc-200 data-[state=unchecked]:bg-zinc-600"
          />
        </div>
      </div>
    </div>
  );
}
