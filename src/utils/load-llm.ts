import { initOllamaProvider } from "./ollama-provider";
import { initAzureProvider } from "./azure-provider";
import { initDeepSeek } from "./deepseek-provider";
import { DynamicParamsType } from "@/components/setting/dynamic-form";
import { toast } from "sonner";
export enum ModelProvider {
  Ollama = "ollama",
  Azure = "azure",

  DeepSeek = "deepseek",
}

export const loadLLMFromSettings = (
  settings: Record<string, any | DynamicParamsType>,
) => {
  const provider = settings.name;
  const config: Record<string, any> = {};
  try {
    Object.entries(settings.dynamic_params as DynamicParamsType).forEach(
      ([key, value]) => {
        config[key] = value.value;
      },
    );
  } catch (error) {
    console.warn(error);
  }
  try {
    const model = createModel(provider, config);
    console.log("model", model);
    return model;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createModel = (provider: string, config: Record<string, any>) => {
  switch (import.meta.env.VITE_LLM_PROVIDER || provider) {
    case ModelProvider.Ollama:
      return initOllamaProvider(config);
    case ModelProvider.Azure:
      return initAzureProvider(config);
    case ModelProvider.DeepSeek:
      return initDeepSeek(config);
    default:
      return initOllamaProvider({});
  }
};
