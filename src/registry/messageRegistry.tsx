import React, { ReactNode } from "react";
import { IMessageProps, MessageType } from "@/store/agentStore";
import {
  SystemMessage,
  UserMessage,
  BotMessage,
  ToolMessage,
  ComputerMessage,
} from "@/components/messages";
import { BaseMessageProps } from "@/types";

/**
 * Type for message component renderer
 */
type MessageRenderer = React.FC<BaseMessageProps>;

/**
 * Registry of message renderers by UI type
 */
class MessageRegistry {
  private registry = new Map<MessageType, MessageRenderer>();

  /**
   * Register a message renderer for a UI type
   * @param type UI type identifier
   * @param renderer Component to render this message type
   */
  register(type: MessageType, renderer: MessageRenderer): void {
    this.registry.set(type, renderer);
  }

  /**
   * Get a message renderer for a UI type
   * @param type UI type identifier
   * @returns The registered renderer or undefined if not found
   */
  getRenderer(type: MessageType): MessageRenderer | undefined {
    return this.registry.get(type);
  }

  /**
   * Render a message with the appropriate component
   * @param message Message to render
   * @returns Rendered component or null if no renderer found
   */
  renderMessage(message: IMessageProps): ReactNode {
    const Renderer = this.getRenderer(message.type);
    if (!Renderer) return null;

    return <Renderer key={message.id} message={message} />;
  }

  /**
   * Initialize the registry with default renderers
   */
  initializeDefaults(): void {
    this.register(MessageType.system, SystemMessage);
    this.register(MessageType.user, UserMessage);
    this.register(MessageType.bot, BotMessage);
    this.register(MessageType.tool, ToolMessage);
    this.register(MessageType.computer, ComputerMessage);
  }
}

// Create and export a singleton instance
export const messageRegistry = new MessageRegistry();

// Initialize with default renderers
messageRegistry.initializeDefaults();
