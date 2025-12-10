import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-3 p-3 input-glass rounded-2xl shadow-lg transition-all focus-within:ring-2 focus-within:ring-primary/20">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share what's on your mind..."
          disabled={disabled}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent px-1 py-1.5 text-sm",
            "placeholder:text-muted-foreground/50",
            "focus:outline-none",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "max-h-[120px]"
          )}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled}
          className={cn(
            "h-9 w-9 rounded-xl shrink-0 transition-all duration-300",
            "bg-primary hover:bg-primary/90",
            "disabled:opacity-30",
            message.trim() && !disabled && "glow-effect animate-pulse-glow"
          )}
        >
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
}
