import { maxTokens } from "@/values";
import { Settings } from "./Settings";

type SettingsActionType =
  | "SET_MODEL"
  | "SET_MAX_TOKENS"
  | "SET_TEMPERATURE"
  | "SET_API_KEY"
  | "SET_AI_CONSULTANT"
  | "SET_LANGUAGE_FEATURES_ENABLED"
  | "SET_STYLES"
  | "SET_TONES"
  | "SET_FORMAT"
  | "SET_ACTION"
  | "SET_CHARACTER"
  | "SET_USE_PASSIVE_VOICE"
  | "SET_PRIVACY_FILTER_ENABLED"
  | string;

export const SettingsReducerAction = {
  SET_MODEL: "SET_MODEL",
  SET_MAX_TOKENS: "SET_MAX_TOKENS",
  SET_TEMPERATURE: "SET_TEMPERATURE",
  SET_API_KEY: "SET_API_KEY",
  SET_AI_CONSULTANT: "SET_AI_CONSULTANT",
  SET_LANGUAGE_FEATURES_ENABLED: "SET_LANGUAGE_FEATURES_ENABLED",
  SET_STYLES: "SET_STYLES",
  SET_TONES: "SET_TONES",
  SET_FORMAT: "SET_FORMAT",
  SET_ACTION: "SET_ACTION",
  SET_CHARACTER: "SET_CHARACTER",
  SET_USE_PASSIVE_VOICE: "SET_USE_PASSIVE_VOICE",
  SET_PRIVACY_FILTER_ENABLED: "SET_PRIVACY_FILTER_ENABLED",
};

export interface SettingsAction {
  type: SettingsActionType;
  payload: string | string[] | number | boolean;
}

export const settingsReducer = (
  state: Settings,
  action: SettingsAction
): Settings => {
  switch (action.type) {
    case SettingsReducerAction.SET_MODEL:
      return { ...state, model: action.payload as string };
    case SettingsReducerAction.SET_MAX_TOKENS:
      if (!/^\d*$/.test(action.payload as string)) return state;
      const tokens = Number(action.payload);
      if (tokens > maxTokens) return state;
      return { ...state, maxTokens: tokens };
    case SettingsReducerAction.SET_TEMPERATURE:
      return { ...state, temperature: action.payload as number };
    case SettingsReducerAction.SET_API_KEY:
      return { ...state, apiKey: action.payload as string };
    case SettingsReducerAction.SET_AI_CONSULTANT:
      return { ...state, aiConsultantId: action.payload as number };
    case SettingsReducerAction.SET_LANGUAGE_FEATURES_ENABLED:
      return { ...state, languageFeaturesEnabled: action.payload as boolean };
    case SettingsReducerAction.SET_STYLES:
      return { ...state, style: action.payload as string[] };
    case SettingsReducerAction.SET_TONES:
      return { ...state, tone: action.payload as string[] };
    case SettingsReducerAction.SET_FORMAT:
      return { ...state, format: action.payload as string };
    case SettingsReducerAction.SET_ACTION:
      return { ...state, action: action.payload as string };
    case SettingsReducerAction.SET_CHARACTER:
      return { ...state, character: action.payload as string };
    case SettingsReducerAction.SET_USE_PASSIVE_VOICE:
      return { ...state, usePassiveVoice: action.payload as boolean };
    case SettingsReducerAction.SET_PRIVACY_FILTER_ENABLED:
      return { ...state, privacyFilterEnabled: action.payload as boolean };

    default:
      return state;
  }
};
