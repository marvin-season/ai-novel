import { createAzure } from "@ai-sdk/azure";

export function initAzureProvider(config: {
  open_model_pref?: string;
  azure_openai_key?: string;
  azure_openai_endpoint?: string;
}) {
  const {
    open_model_pref = import.meta.env.VITE_OPEN_MODEL_PREF,
    azure_openai_key = import.meta.env.VITE_AZURE_OPENAI_KEY,
    azure_openai_endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT,
  } = config;
  const model = open_model_pref;
  const apiKey = azure_openai_key;
  const baseURL = `${azure_openai_endpoint}/openai/deployments/`;
  if (!model) {
    throw new Error("Model is not defined");
  }
  if (!apiKey) {
    throw new Error("API Key is not defined");
  }
  if (!baseURL) {
    throw new Error("Base URL is not defined");
  }
  const azure = createAzure({
    baseURL,
    apiKey,
  });

  return azure(model);
}
