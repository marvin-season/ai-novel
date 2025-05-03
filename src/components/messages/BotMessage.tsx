import  { memo } from "react";
import { MessageBadge } from "./MessageBadge";
import { BaseMessageProps } from "@/types";

/**
 * Props for the BotMessage component
 */
interface BotMessageProps extends BaseMessageProps {}

/**
 * Bot message UI component
 */
export const BotMessage = memo(({ message }: BotMessageProps) => {
  return (
    <div className="bg-gray-100 rounded-md p-2 flex gap-2 items-center">
      <MessageBadge label="bot" />
      <MessageBadge
        label={message.id}
        bgColor="bg-blue-300"
        textColor="text-white"
      />
      <MessageBadge
        label={message.content}
        bgColor="bg-green-500"
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
