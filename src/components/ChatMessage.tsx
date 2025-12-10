import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-message-enter",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all",
          isUser
            ? "bg-primary/10 text-primary"
            : "bg-primary text-primary-foreground glow-effect-subtle"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 transition-all",
          isUser
            ? "chat-bubble-user rounded-br-md"
            : "chat-bubble-ai rounded-bl-md"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-primary/80 cursor-blink rounded-sm" />
          )}
        </p>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-message-enter">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-primary-foreground glow-effect-subtle">
        <Bot className="w-4 h-4" />
      </div>
      <div className="chat-bubble-ai rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1.5 items-center h-5">
          <span className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
          <span className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
          <span className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
        </div>
      </div>
    </div>
  );
}
