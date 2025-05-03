import { MessageType, useAgentStore } from "@/store/agentStore";
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
        type: MessageType.bot,
      });
      setCompletion("");
    }
  }, [completion]);
  return (
    <div className="flex flex-col h-full p-4 w-[480px]">
      <MessageList />
      <Sender
        loading={isLoading}
        onSubmit={(content) => {
          idRef.current = generateId();
          replaceMessage({
            id: generateId(),
            content,
            timestamp: Date.now(),
            type: MessageType.user,
          });
          complete(content, {
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