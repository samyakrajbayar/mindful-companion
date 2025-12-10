import { useRef, useEffect } from "react";
import { Heart, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage, TypingIndicator } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { QuickPrompts } from "@/components/QuickPrompts";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

const Index = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen gradient-soft flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-semibold text-foreground">MindfulBot</h1>
              <p className="text-xs text-muted-foreground">Your mental wellness companion</p>
            </div>
          </div>
          {hasMessages && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New chat
            </Button>
          )}
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6">
            {!hasMessages ? (
              /* Welcome State */
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
                <div className="space-y-4 animate-fade-in-up">
                  <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center mx-auto shadow-float animate-pulse-glow">
                    <Sparkles className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    Hi there! How are you feeling today?
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                    I'm here to listen and support you. Whether you're dealing with stress, 
                    anxiety, or just need someone to talk to, I'm here for you.
                  </p>
                </div>

                <QuickPrompts onSelect={sendMessage} />

                <p className="text-xs text-muted-foreground/70 max-w-sm">
                  Remember: I'm here to support, not replace professional help. 
                  If you're in crisis, please reach out to a counselor or call 988.
                </p>
              </div>
            ) : (
              /* Messages */
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    isStreaming={
                      isLoading &&
                      index === messages.length - 1 &&
                      message.role === "assistant"
                    }
                  />
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <TypingIndicator />
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div
          className={cn(
            "sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-4",
            "border-t border-border/30"
          )}
        >
          <div className="max-w-2xl mx-auto px-4">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
            <p className="text-center text-xs text-muted-foreground/60 mt-3">
              MindfulBot provides support, not professional medical advice
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
