import { IMessageStatus, MessageRole, useAgentStore } from "@/store/agentStore";
import MessageList from "./message-list";
import { Sender } from '@ant-design/x';
import { generateId } from "@/utils";
import completionFetch from "@/utils/completion-fetch";
import { useCompletion } from "@ai-sdk/react";
import { toast } from "sonner";
import { AICommand } from "@/types";
import { useEffect, useRef, useState } from "react";
export default function ChatAssistant() {
  const replaceMessage = useAgentStore((state) => state.replaceMessage);
  const messages = useAgentStore(state => state.messages);
  const idRef = useRef('');
  const [value, setValue] = useState<string>('');
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
  return (
    <div className="flex flex-col h-full p-4 w-[480px]">
      <MessageList />
      <Sender
        value={value}
        onChange={(value) => {
          setValue(value)
        }}
        loading={isLoading}
        onSubmit={async () => {
          idRef.current = generateId();
          replaceMessage({
            id: generateId(),
            content: value,
            timestamp: Date.now(),
            role: MessageRole.user,
          });
          replaceMessage({
            id: idRef.current,
            content: 'a',
            timestamp: Date.now(),
            role: MessageRole.assistant,
            status: IMessageStatus.loading,
          });
          setValue('');
          await complete(value, {
            body: {
              command: AICommand.chat,
              context: messages
            }
          })
        }}
        allowSpeech
      />
    </div>
  )
}