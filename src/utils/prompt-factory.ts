import { CoreMessage } from 'ai'

export const getPrompt = ({ prompt, command, context }: { prompt?: string; command: string; context?: string }): CoreMessage[] => {
  let messages: CoreMessage[] = []

  // 使用 switch 语句替换 ts-pattern
  switch (command) {
    case 'continue':
      messages.push({
        role: 'system',
        content: `你是一个AI写作的续写高手, 你的任务是对用户提供的现有文本进行续写。`,
      })

      messages.push({
        role: 'user',
        content: `现有文本：${context}`,
      })

      break

    case 'improve':
      messages = [
        {
          role: 'system',
          content: '你是一个AI写作助手，你的任务是改善现有文本。' + '请将你的回应限制在不超过200个字符以内，并确保构建完整的句子。',
        },
      ]
      break

    case 'shorter':
      messages = [
        {
          role: 'system',
          content: '你是一个AI写作助手，你的任务是缩短现有文本。',
        },
        {
          role: 'user',
          content: `现有文本: ${prompt}`,
        },
      ]
      break

    case 'longer':
      messages = [
        {
          role: 'system',
          content: '你是一个AI写作助手，你的任务是延长现有文本。',
        },
        {
          role: 'user',
          content: `现有文本: ${prompt}`,
        },
      ]
      break

    case 'fix':
      messages = [
        {
          role: 'system',
          content: '你是一个AI写作助手，你的任务是修正现有文本中的语法和拼写错误。' + '请将你的回应限制在不超过200个字符以内，并确保构建完整的句子。',
        },
        {
          role: 'user',
          content: `现有文本: ${prompt}`,
        },
      ]
      break

    case 'zap':
      messages = [
        {
          role: 'system',
          content: '你是一个AI写作助手，基于用户输入和上下文生成文本。' + '请将你的回应限制在不超过200个字符以内，并确保构建完整的句子。',
        },
        {
          role: 'user',
          content: `用户输入: ${prompt}. 请参考上下文: ${context} 生成文本`,
        },
      ]
      break

    case 'translate':
      messages = [
        {
          role: 'system',
          content: '你是一个中英翻译助手！请直接返回翻译结果！！',
        },
        {
          role: 'user',
          content: `请翻译: "${prompt}"!`,
        },
      ]
      break

    default:
      // 默认情况下，返回一个空的 messages 数组
      messages = []
      break
  }

  // 添加额外的系统提示
  return messages as CoreMessage[]
}
