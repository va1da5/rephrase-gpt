import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React from "react";

type CustomSelectProps = {
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  value: string | undefined;
  onValueChange: (value: string) => void;
};

export default function Options({
  label,
  options,
  placeholder,
  value,
  onValueChange,
}: CustomSelectProps) {
  const id = React.useId();
  return (
    <>
      <div>
        <Label htmlFor={id} className="text-sm text-white">
          {label}
        </Label>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            id={id}
            className="w-full border-zinc-500 bg-zinc-800 text-white focus:ring-offset-1 focus:ring-offset-blue-600"
          >
            <SelectValue placeholder={placeholder || label} />
          </SelectTrigger>
          <SelectContent className="border-zinc-500 bg-zinc-800 text-white">
            <SelectGroup>
              {options &&
                options.length &&
                options.map((item, idx) => (
                  <SelectItem key={idx} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
