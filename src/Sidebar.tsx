import { useState } from "react";

import { TbInfoCircleFilled } from "react-icons/tb";

import {
  Select,
  Space,
  ConfigProvider,
  theme,
  InputNumber,
  Slider,
} from "antd";

import { styles, tones, formats, actions, characters, models } from "./values";
import { Settings } from "./types";

type Props = {
  setSettings: (fn: (current: Settings) => Settings) => void;
  settings: any;
};

export default function Sidebar({ settings, setSettings }: Props) {
  return (
    <div className="fixed h-screen  w-72 overflow-y-auto bg-zinc-800 px-4 pt-2 pb-20 text-white">
      <h1 className="mb-10 mt-3 text-3xl">🤓 RephraseGPT</h1>

      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Space style={{ width: "100%" }} className="" direction="vertical">
          <p>GPT Model</p>
          <Select
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={(update: string) => {
              setSettings((current: Settings) => {
                return { ...current, model: update };
              });
            }}
            options={models.map((value) => ({ label: value, value }))}
            value={settings.model}
          />
          <p>Language Style</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={(update: string[]) => {
              setSettings((current: Settings) => {
                return { ...current, style: update };
              });
            }}
            options={styles.map((value) => ({ label: value, value }))}
            value={settings.style}
            disabled={settings.action == "None"}
          />
          <p className="mt-3">Language Tone</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={(update: string[]) => {
              setSettings((current: Settings) => {
                return { ...current, tone: update };
              });
            }}
            options={tones.map((value) => ({ label: value, value }))}
            value={settings.tone}
            disabled={settings.action == "None"}
          />
          <p className="mt-3">Imitate Character</p>
          <Select
            style={{ width: "100%" }}
            onChange={(update) => {
              setSettings((current) => {
                return { ...current, character: update };
              });
            }}
            options={characters.map((value) => ({ label: value, value }))}
            value={settings.character}
            disabled={settings.action == "None"}
          />
          <p className="mt-3">Output Format</p>
          <Select
            style={{ width: "100%" }}
            onChange={(update) => {
              setSettings((current) => {
                return { ...current, format: update };
              });
            }}
            options={formats}
            value={settings.format}
            disabled={settings.action == "None"}
          />
          <p className="mt-3">Action</p>
          <Select
            defaultValue="rephrase"
            style={{ width: "100%" }}
            onChange={(update) => {
              setSettings((current) => {
                return { ...current, action: update };
              });
            }}
            options={actions.map((value) => ({ label: value, value }))}
            value={settings.action}
          />
          <p className="mt-3">Max Tokens</p>
          <InputNumber
            min={10}
            max={6000}
            style={{ width: "100%" }}
            value={settings.maxTokens}
            onChange={(update) => {
              setSettings((current) => {
                return { ...current, maxTokens: update };
              });
            }}
          />
          <p className="mt-3 flex items-center gap-1">
            Temperature{" "}
            <a
              href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-temperature"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbInfoCircleFilled />
            </a>
          </p>
          <Slider
            min={0}
            max={2}
            step={0.1}
            onChange={(update) => {
              setSettings((current) => {
                return { ...current, temperature: update };
              });
            }}
            value={settings.temperature}
          />
          <p className="text-gr text-xs text-gray-500">
            Temperature affects output randomness. Values closer to 0.2 produce
            deterministic outputs, while values near 0.8 produce random outputs.
          </p>
        </Space>
      </ConfigProvider>
    </div>
  );
}
