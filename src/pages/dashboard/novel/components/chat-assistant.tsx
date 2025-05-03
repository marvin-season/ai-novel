import { MessageType, useAgentStore } from "@/store/agentStore";
import MessageList from "./message-list";
import { useEffect } from "react";

export default function ChatAssistant() {
  const initializeMessages = useAgentStore((state) => state.initializeMessages);
  useEffect(() => {
    console.log("init");
    initializeMessages([
      {
        content: " System Tips: click the btn!",
        type: MessageType.system,
        id: "otyl4xqgjoe",
        timestamp: 1744789231918,
      },
    ]);
    return () => {
      console.log("clean");
      initializeMessages([]);
    };
  }, []);
  return (
    <div>
      <MessageList />
    </div>
  )
}