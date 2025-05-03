import React, { memo } from "react";
import { MessageBadge } from "./MessageBadge";
import { BaseMessageProps } from "@/types";

/**
 * Props for the SystemMessage component
 */
interface SystemMessageProps extends BaseMessageProps {}

/**
 * System message UI component
 */
export const SystemMessage = memo(({ message }: SystemMessageProps) => {
  return (
    <div className="bg-gray-300 rounded-md p-2 flex gap-2 items-center">
      <MessageBadge label="system" />
      <MessageBadge
        label={message.id}
        bgColor="bg-blue-500"
        textColor="text-white"
      />
      <MessageBadge
        label={message.content}
        bgColor="bg-green-400"
        textColor="text-white"
      />
      {message.timestamp && (
        <span className="text-xs text-gray-600">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
});
