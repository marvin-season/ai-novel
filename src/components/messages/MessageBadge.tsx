import React, { memo } from "react";

/**
 * Props for the MessageBadge component
 */
interface MessageBadgeProps {
  /** Label text to display */
  label: string | number;
  /** Background color class */
  bgColor?: string;
  /** Text color class */
  textColor?: string;
}

/**
 * Badge component for message UI elements
 */
export const MessageBadge = memo(
  ({
    label,
    bgColor = "bg-white",
    textColor = "text-gray-800",
  }: MessageBadgeProps) => {
    return (
      <span className={`${bgColor} ${textColor} px-2 py-1 rounded-xl text-sm`}>
        {label}
      </span>
    );
  },
);
