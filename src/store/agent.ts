import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

/**
 * Enum for UI message types
 */
export enum MessageRole {
  system = "system",
  user = "user",
  assistant = "assistant",
  tool = "tool",
  computer = "computer",
}

export enum IMessageStatus {
  loading = "loading",
  typing = "typing",
  success = "success",
  error = "error",
}

/**
 * Interface for message properties
 */
export interface IMessageProps {
  /** Unique identifier for the message */
  id: string;
  /** Content of the message */
  content: string;
  /** Type of UI to render for this message */
  role: MessageRole;
  /** Optional timestamp for the message */
  timestamp?: number;
  title?: string;
  status?: IMessageStatus;
}

/**
 * Interface for agent store state
 */
export interface AgentState {
  value: string;
  setValue: (value: string) => void;
  /** Array of messages */
  messages: IMessageProps[];

  /** Actions */
  appendMessage: (message: IMessageProps) => void;
  replaceMessage: (message: IMessageProps) => void;
  initializeMessages: (messages: IMessageProps[]) => void;

  /** Selectors */
  getMessagesByType: (type: MessageRole) => IMessageProps[];
  getLatestMessage: () => IMessageProps | null;
}

/**
 * Create the agent store with Zustand
 */
export const useAgentStore = create<AgentState>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      messages: [],
      value: "",

      // Actions
      setValue: (value) => {
        set((state) => {
          state.value = value;
        });
      },
      replaceMessage(message) {
        set((state) => {
          const index = state.messages.findIndex(
            (item) => item.id === message.id,
          );
          if (index > -1) {
            state.messages[index] = message;
          } else {
            state.messages.push(message);
          }
        });
      },
      appendMessage: (message: IMessageProps) => {
        set((state) => {
          const existedIndex = state.messages.findIndex(
            (item) => item.id === message.id,
          );

          if (existedIndex > -1) {
            // Update existing message
            state.messages[existedIndex] = {
              ...state.messages[existedIndex],
              content: state.messages[existedIndex].content + message.content,
              timestamp: Date.now(),
            };
          } else {
            // Add new message
            state.messages.push({
              ...message,
              timestamp: message.timestamp || Date.now(),
            });
          }
        });
      },

      initializeMessages: (messages: IMessageProps[]) => {
        set((state) => {
          state.messages = messages;
        });
      },

      // Selectors
      getMessagesByType: (type: MessageRole) => {
        return get().messages.filter((message) => message.role === type);
      },

      getLatestMessage: () => {
        const { messages } = get();
        return messages.length > 0 ? messages[messages.length - 1] : null;
      },
    })),
    { name: "agentStore" },
  ),
);
