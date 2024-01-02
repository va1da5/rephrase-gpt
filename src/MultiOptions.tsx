import React from "react";
import Select, {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  MultiValue,
  MultiValueRemoveProps,
  components,
} from "react-select";
import { cn } from "@/lib/utils";

import { ChevronDown, X } from "lucide-react";
import { Label } from "@/components/ui/label";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  value: Option[];
  onChange: (newValue: MultiValue<Option>) => void;
};

export default function MultiOptions({
  options,
  label,
  value,
  onChange,
}: Props) {
  const id = React.useId();
  return (
    <div>
      <Label htmlFor={id} className="text-sm text-white">
        {label}
      </Label>
      <Select
        id={id}
        closeMenuOnSelect={false}
        options={options}
        isMulti
        unstyled
        onChange={onChange}
        hideSelectedOptions={false}
        value={value}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            cn(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base
            ),
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
      />
    </div>
  );
}

const controlStyles = {
  base: "border border-zinc-500 rounded-md bg-zinc-800 hover:cursor-pointer",
  focus: "border-primary-600 ring-1 ring-primary-500",
  nonFocus: "border-zinc-300 hover:border-zinc-400",
};
const placeholderStyles = "text-zinc-500 pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5 text-white";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles =
  "bg-zinc-700 text-white rounded-md items-center pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles = " hover:text-white text-gray-400";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles = "hover:text-white text-gray-400";
const dropdownIndicatorStyles = "pr-1 hover:text-white text-gray-400";
const menuStyles =
  "p-1 mt-2 text-sm text-white border border-zinc-500 bg-zinc-800 rounded-md";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-gray-100 active:bg-gray-200 text-black",
  selected: "after:content-['✔'] after:ml-2 after:text-gray-500 text-gray-500",
};
const noOptionsMessageStyles =
  "text-gray-500 p-2 bg-zinc-800 border border-dashed border-zinc-500 rounded-sm";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown className="mr-1 h-4 w-4" />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <X className="h-4 w-4" />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <X className="h-4 w-4 " />
    </components.MultiValueRemove>
  );
};
