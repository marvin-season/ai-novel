import { createOllama } from "ollama-ai-provider";

export function initOllamaProvider(props: {
  model?: string;
  base_url?: string;
}) {
  const {
    model = import.meta.env.VITE_OLLAMA_ENDPOINT,
    base_url = import.meta.env.VITE_OLLAME_LLM_MODEL + "/api",
  } = props;
  if (!model) {
    throw new Error("Model is not defined");
  }
  if (!base_url) {
    throw new Error("Endpoint is not defined");
  }
  return createOllama({
    baseURL: base_url,
  })(model);
}
