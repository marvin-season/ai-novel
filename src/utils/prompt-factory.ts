import { AICommand } from "@/types";
import { CoreMessage } from "ai";

export const getPrompt = ({
  prompt,
  command,
  context,
}: {
  prompt?: string;
  command: AICommand;
  context?: string;
}): CoreMessage[] => {
  let messages: CoreMessage[] = [
    {
      role: "system",
      content:
        "请将你的回应限制在不超过300个字符以内，并确保构建完整的句子。你需要直接返回用户结果，不要做额外的解释除非用户特殊要求你解释！",
    },
  ];

  // 使用 switch 语句替换 ts-pattern
  switch (command) {
    case AICommand.explain:
      messages.push({
        role: 'system',
        content: `You are an English expert! You need to explain English words entered by users in simpler English.`,
      },
        {
          role: 'system',
          content: `Your response should refer to the following format:
                1.${prompt}
                2.A simple explanation of ${prompt}
                3. An example sentence of ${prompt}`,
        },
        {
          role: 'user',
          content: `用户是输入的单词：${prompt}`,
        }
      );
      break;
    case AICommand.continue:
      messages.push({
        role: "system",
        content: `你是一个AI写作的续写高手, 你的任务是对用户提供的现有文本进行续写。`,
      });

      messages.push({
        role: "user",
        content: `现有文本：${prompt}`,
      });

      break;

    case AICommand.improve:
      messages.push({
        role: "system",
        content: "你是一个AI写作助手，你的任务是改善现有文本。",
      });
      break;

    case AICommand.shorter:
      messages.push({
        role: "system",
        content: "你是一个AI写作助手，你的任务是缩短现有文本。",
      });
      messages.push({
        role: "user",
        content: `现有文本: ${prompt}`,
      });
      break;

    case AICommand.longer:
      messages.push({
        role: "system",
        content: "你是一个AI写作助手，你的任务是延长现有文本。",
      });
      messages.push({
        role: "user",
        content: `现有文本: ${prompt}`,
      });
      break;

    case AICommand.fix:
      messages.push({
        role: "system",
        content:
          "你是一个AI写作助手，你的任务是纠正用户输入的语法和拼写错误，然后将正确的文本直接返回给用户",
      });
      messages.push({
        role: "user",
        content: `${prompt}`,
      });

      break;

    case AICommand.zap:
      messages.push({
        role: "system",
        content: "你是一个AI写作助手，基于用户输入和上下文生成文本。",
      });
      messages.push({
        role: "user",
        content: `用户输入: ${prompt}. 请参考上下文: ${context} 生成文本`,
      });
      break;

    case AICommand.translate:
      messages.push({
        role: "system",
        content:
          "你是一个中英翻译助手！请根据用户的输入，返回翻译后的结果，翻译尽可能的地道！",
      });
      messages.push({
        role: "user",
        content: `"${prompt}"!`,
      });
      break;

    default:
      // 默认情况下，返回一个空的 messages 数组
      messages = [];
      break;
  }

  // 添加额外的系统提示
  return messages as CoreMessage[];
};
