import { streamText } from "ai";
import { loadLLMFromSettings } from "./load-llm";
import { getPrompt } from "./prompt-factory";
import { UseCompletionOptions } from "@ai-sdk/react";
import { toast } from "sonner";
import { useModelStore } from "@/store/model";


export default function useCompletionFetch() {
  const { config } = useModelStore()
  const completionFetch: UseCompletionOptions["fetch"] = async (
    request,
    info,
  ) => {

    const { command, context, prompt } = info
      ? JSON.parse((info.body as string) || "{}")
      : {};
    //生成提示词
    const messages = getPrompt({
      command,
      context,
      prompt,
    });


    if (!config) {
      toast.error("模型配置错误", { duration: 3000 });
      return new Response();
    }
    const model = loadLLMFromSettings(config);
    if (!model) {
      toast.error("模型配置错误", { duration: 3000 });

      return new Response();
    }

    const stream = streamText({
      model,
      messages,
    });

    // 返回 Response 对象
    return stream.toDataStreamResponse();
  };

  return {
    completionFetch: config ? completionFetch : undefined,
  }
};
