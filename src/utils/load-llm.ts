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
  Object.entries(settings.dynamic_params as DynamicParamsType).forEach(
    ([key, value]) => {
      config[key] = value.value;
    },
  );
  try {
    const model = createModel(provider, config);
    console.log("model", model);
    return model;
  } catch (error: any) {
    console.error(error.message)
    toast.error('模型配置错误')
    throw '模型配置错误'
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
