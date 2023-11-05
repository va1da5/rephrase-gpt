import { Input, Button, Modal, Badge } from "antd";

import { Settings } from "./types";
import { useState } from "react";
import React from "react";

type Props = {
  setSettings: (fn: (current: Settings) => Settings) => void;
  settings: any;
};

export default function ApiKey({ settings, setSettings }: Props) {
  const [modal, setModal] = useState({
    isOpen: false,
    value: "",
  });

  const onOk = () => {
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
  };

  return (
    <div className="fixed top-5 right-5 z-30">
      <Button
        className={`${settings?.apiKey?.length ? "opacity-70" : ""}`}
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
        onCancel={() => {
          setModal((current) => ({
            ...current,
            isOpen: false,
          }));
        }}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              type="primary"
              disabled={modal.value.length < 5}
              onClick={onOk}
              className="text-white bg-blue-600"
            >
              OK
            </Button>
          </>
        )}
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
  );
}

export const MemoizedApiKey = React.memo(ApiKey);
