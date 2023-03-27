import { useState } from "react";

import { TbInfoCircleFilled } from "react-icons/tb";

import {
  Input,
  Select,
  Space,
  ConfigProvider,
  theme,
  Button,
  Modal,
  Badge,
  InputNumber,
  Slider,
} from "antd";

import { styles, tones, formats, actions, characters } from "./values";
import { Settings } from "./types";

type Props = {
  setSettings: (fn: (current: Settings) => Settings) => void;
  settings: any;
};

export default function Sidebar({ settings, setSettings }: Props) {
  const [modal, setModal] = useState({
    isOpen: false,
    value: "",
  });

  return (
    <div className="fixed h-screen w-72 bg-zinc-800 px-4 pt-2 text-white">
      <h1 className="mb-10 mt-3 text-3xl">🤓 RephraseGPT</h1>

      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Space style={{ width: "100%" }} direction="vertical">
          <p>Language Style</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            // defaultValue={[]}
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
            // defaultValue={[]}
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
      <div className="fixed bottom-5 left-5">
        <Button
          type="default"
          onClick={() => {
            setModal((current) => ({
              ...current,
              isOpen: true,
            }));
          }}
        >
          <span className="mr-3">
            <Badge status={settings.apiKey.length > 0 ? "success" : "error"} />
          </span>
          OpenAI API Key
        </Button>
        <Modal
          title="🔑 OpenAI API Key"
          open={modal.isOpen}
          onOk={() => {
            setModal((current) => {
              setSettings((now: Settings) => ({
                ...now,
                apiKey: current.value,
              }));

              return {
                value: "",
                isOpen: false,
              };
            });
          }}
          onCancel={() => {
            setModal((current) => ({
              ...current,
              isOpen: false,
            }));
          }}
        >
          {" "}
          <div className="my-5">
            <Input
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={modal.value}
              onChange={(e) => {
                setModal((current) => ({
                  ...current,
                  value: e.target.value,
                }));
              }}
            />
            <p className="mt-1 text-xs text-gray-500">
              The API key will be storage locally and only sent to OpenAI API.
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}
