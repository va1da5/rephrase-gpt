import React from "react";

import { X } from "lucide-react";
import { ScrollArea } from "./components/ui/scroll-area";

type ItemProps = {
  label: string;
};

function Item({ label }: ItemProps) {
  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-md bg-zinc-700 px-2 py-1 text-white transition-colors duration-200 hover:bg-zinc-600">
      <p>{label}</p>
      <button className="text-gray-400">
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
};

export default function ItemsPool({ values, label }: ItemsPoolProps) {
  return (
    <div>
      <div className="text-sm text-white">{label}</div>
      <div className="flex max-h-[200px] flex-wrap gap-1 overflow-auto rounded-md border border-zinc-500 p-2">
        {values.map(({ label }, idx) => (
          <Item key={idx} label={label} />
        ))}
      </div>
      ;
    </div>
  );
}
