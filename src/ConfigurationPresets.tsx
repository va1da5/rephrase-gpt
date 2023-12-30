import React from "react";
import { Button } from "./components/ui/button";
import ItemsPool from "./ItemsPool";

type Props = {};

export default function ConfigurationPresets({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-lg font-bold text-gray-300">
          Configuration Presets
        </div>

        <div className="text-sm text-gray-400">
          Provides a convenient way to switch between different configurations
        </div>
      </div>

      <Button className="bg-zinc-700 px-10 transition-all duration-300 hover:bg-zinc-500">
        Save Current
      </Button>

      <ItemsPool
        label="Configurations"
        values={["Friendly", "Formal", "Technical"].map((label) => ({
          label,
          value: label,
        }))}
      />
    </div>
  );
}
