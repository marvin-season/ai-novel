import React, { memo, useState, useEffect } from "react";
import { MessageBadge } from "./MessageBadge";
import { EE } from "@/utils/events";
import { BaseMessageProps } from "@/types";

/**
 * Props for the ToolMessage component
 */
interface ToolMessageProps extends BaseMessageProps { }

/**
 * Tool message UI component with streaming content
 */
export const ToolMessage = memo(({ message }: ToolMessageProps) => {
  const [content, setContent] = useState(message.content || "");

  useEffect(() => {
    // Handler for tool events
    const handler = (data: { id: string; str: string }) => {
      if (data.id === message.id) {
        setContent((prev) => prev + data.str);
      }
    };

    // Subscribe to tool events
    EE.on("tool", handler);

    // Cleanup subscription on unmount
    return () => {
      EE.off("tool", handler);
    };
  }, [message.id]);

  return (
    <div className="bg-gray-300 border rounded-md p-4 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <MessageBadge label="tool" />
        <MessageBadge
          label={message.id}
          bgColor="bg-blue-300"
          textColor="text-white"
        />
        {message.timestamp && (
          <span className="text-xs text-gray-600">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="w-full max-w-[500px] max-h-36 break-words bg-white px-2 py-1 rounded-xl text-sm overflow-y-auto">
        {content}
      </div>
    </div>
  );
});
