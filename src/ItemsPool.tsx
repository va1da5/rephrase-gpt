import { X } from "lucide-react";

type ItemProps = {
  label: string;
  onRemove: () => void;
  onClick: () => void;
};

function Item({ label, onRemove, onClick }: ItemProps) {
  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-md bg-zinc-700 px-2 py-1 text-white transition-colors duration-200 hover:bg-zinc-600">
      <button onClick={onClick}>{label}</button>
      <button className="text-gray-400" onClick={onRemove}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

type ItemsPoolProps = {
  label: string;
  values: {
    label: string;
    value: string;
  }[];
  onRemove?: (idx: number) => void;
  onSelect?: (idx: number) => void;
};

export default function ItemsPool({
  values,
  label,
  onRemove,
  onSelect,
}: ItemsPoolProps) {
  return (
    <div>
      <div className="text-sm text-white">{label}</div>
      <div className="flex max-h-[200px] min-h-[50px] flex-wrap gap-1 overflow-auto rounded-md border border-zinc-500 p-2">
        {values.map(({ label }, idx) => (
          <Item
            key={idx}
            label={label}
            onRemove={() => onRemove && onRemove(idx)}
            onClick={() => onSelect && onSelect(idx)}
          />
        ))}
      </div>
      ;
    </div>
  );
}
