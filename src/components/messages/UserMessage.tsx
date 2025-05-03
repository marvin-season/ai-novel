import React, { memo } from "react";
import { IMessageProps } from "@/store/agentStore";
import { MessageBadge } from "./MessageBadge";
import { BaseMessageProps } from "@/types";

/**
 * Props for the UserMessage component
 */
interface UserMessageProps extends BaseMessageProps {}

/**
 * User message UI component
 */
export const UserMessage = memo(({ message }: UserMessageProps) => {
  return (
    <div className="bg-gray-200 rounded-md p-2 flex gap-2 items-center">
      <MessageBadge label="user" />
      <MessageBadge
        label={message.id}
        bgColor="bg-blue-400"
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
