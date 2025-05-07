import { IMessageStatus, MessageRole, useAgentStore } from "@/store/agent";
import MessageList from "./message-list";
import { Sender } from "@ant-design/x";
import { generateId } from "@/utils";
import { useCompletion } from "@ai-sdk/react";
import { toast } from "sonner";
import { AICommand } from "@/types";
import { useEffect, useRef, useState } from "react";
import useCompletionFetch from "@/utils/completion-fetch";
import useAssistantStore from "@/store/assistant";
import { useNovelStore } from "@/store/novel";

interface Props {
  visible: boolean;
}
export default function ChatAssistant({ visible }: Props) {
  const replaceMessage = useAgentStore((state) => state.replaceMessage);
  const { messages, value, setValue, initializeMessages } = useAgentStore();
  const { novelId, conversationId } = useNovelStore()
  const { getConversation, appendMessages } = useAssistantStore()
  const { completionFetch } = useCompletionFetch()
  const idRef = useRef("");
  const { completion, complete, isLoading, setCompletion } = useCompletion({
    fetch: completionFetch,
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        return;
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
    onFinish(a) {
      debugger
      conversationId && messages.length > 0 && appendMessages(conversationId, messages)
    }
  });

  useEffect(() => {
    if (completion) {
      replaceMessage({
        id: idRef.current,
        content: completion,
        timestamp: Date.now(),
        role: MessageRole.assistant,
        status: IMessageStatus.typing,
      });
      setCompletion("");
    }
  }, [completion]);

  // init message from assistant store
  useEffect(() => {
    const conversation = getConversation(conversationId!)
    conversation && initializeMessages(conversation.messages);
  }, [novelId]);

  return (
    <>
      <div
        className={`flex flex-col h-full w-[400px] box-border overflow-y-scroll shadow-md backdrop-blur-sm bg-[#fffe]`}
      >
        <MessageList />
        <div className="sticky bottom-4 bg-white px-4">
          <Sender
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
            loading={isLoading}
            onSubmit={async () => {
              idRef.current = generateId();
              const userMessage = {
                id: generateId(),
                content: value,
                timestamp: Date.now(),
                role: MessageRole.user,
              }
              replaceMessage(userMessage); // update chat templ message

              conversationId && appendMessages(conversationId, [userMessage]) // update db message

              replaceMessage({
                id: idRef.current,
                content: "a",
                timestamp: Date.now(),
                role: MessageRole.assistant,
                status: IMessageStatus.loading,
              });
              setValue("");
              await complete(value, {
                body: {
                  command: AICommand.chat,
                  context: messages,
                },
              });
            }}
            allowSpeech
          />
          <div className="flex justify-center text-xs text-gray-400 py-4">
            {"回答由大模型生成，可能存在错误，请以实际为准。"}
          </div>
        </div>
      </div>
    </>
  );
}
