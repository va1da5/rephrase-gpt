import {
  gptModels,
  languageActions,
  outputFormats,
  pretendCharacters,
} from "@/values";

export interface Settings {
  model: string;
  maxTokens: number;
  temperature: number;
  apiKey?: string;
  aiConsultantId: number;
  languageFeaturesEnabled: boolean;
  style: string[];
  tone: string[];
  format: string;
  action: string;
  character: string;
  usePassiveVoice: boolean;
  privacyFilterEnabled: boolean;
  privacyKeywords: string[];
  configurationPresents?: {
    label: string;
    value: string;
  }[];
}

export const defaultSettings: Settings = {
  model: gptModels[0],
  maxTokens: 3000,
  temperature: 0.3,
  apiKey: "",
  aiConsultantId: 0,
  languageFeaturesEnabled: true,
  style: ["Casual", "Inclusive"],
  tone: ["Calm", "Friendly"],
  format: outputFormats[0].value,
  action: languageActions[2],
  character: pretendCharacters[0],
  usePassiveVoice: true,
  privacyFilterEnabled: true,
  privacyKeywords: ["AWS", "VPC"],
  configurationPresents: [],
};
