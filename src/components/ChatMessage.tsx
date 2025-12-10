import { cn } from "@/lib/utils";
import { Heart, User } from "lucide-react";

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
        "flex gap-3 animate-fade-in-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
          isUser
            ? "bg-primary/10 text-primary"
            : "gradient-hero text-primary-foreground shadow-soft"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Heart className="w-4 h-4" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-soft",
          isUser
            ? "gradient-message-user text-primary-foreground rounded-br-sm"
            : "gradient-message-ai text-foreground rounded-bl-sm border border-border/50"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-current animate-pulse rounded-sm" />
          )}
        </p>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in-up">
      <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center gradient-hero text-primary-foreground shadow-soft">
        <Heart className="w-4 h-4" />
      </div>
      <div className="gradient-message-ai rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft border border-border/50">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
        </div>
      </div>
    </div>
  );
}
