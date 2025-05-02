import { streamText } from "ai";
import { loadLLMFromSettings } from "./load-llm";
import { getPrompt } from "./prompt-factory";
import { UseCompletionOptions } from '@ai-sdk/react';
import { toast } from "sonner";
const completionFetch: UseCompletionOptions['fetch'] = async (request, info) => {
    const { command, context, prompt } = info ? JSON.parse((info.body as string) || '{}') : {}
    //生成提示词
    const messages = getPrompt({
        command,
        context,
        prompt,
    })
    const modelConfig = JSON.parse(
        localStorage.getItem("model-config") || "{}",
    );
    const model = loadLLMFromSettings(modelConfig)
    if (!model) {
        toast.error("模型配置错误", { duration: 3000 });

        return new Response()
    }
    const config: Parameters<typeof streamText>[0] = {
        model,
        messages,
    }
    const stream = streamText(config)

    // 返回 Response 对象
    return stream.toDataStreamResponse()
}

export default completionFetch