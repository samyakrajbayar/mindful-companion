import { useRef, useEffect } from "react";
import { Bot, RotateCcw, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage, TypingIndicator } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { QuickPrompts } from "@/components/QuickPrompts";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

const Index = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-effect">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground flex items-center gap-2">
                MindfulBot
                <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">v1.0</span>
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                <span className="text-primary">●</span> Online • Ready to help
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {hasMessages && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMessages}
                className="text-muted-foreground hover:text-foreground gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New</span>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {!hasMessages ? (
              /* Welcome State */
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
                <div className="space-y-6 animate-fade-in-up">
                  {/* Animated icon */}
                  <div className="relative mx-auto">
                    <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center glow-effect animate-float">
                      <Sparkles className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -inset-4 rounded-3xl border border-primary/20 animate-pulse" />
                  </div>

                  {/* Welcome text */}
                  <div className="space-y-3">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                      Hey there! 👋
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                      I'm here to listen and support you through whatever you're going through. 
                      How are you feeling today?
                    </p>
                  </div>
                </div>

                {/* Quick prompts */}
                <div className="w-full max-w-lg">
                  <QuickPrompts onSelect={sendMessage} />
                </div>

                {/* Disclaimer */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground/60 bg-muted/30 px-4 py-2 rounded-full">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Not a replacement for professional help. In crisis? Call <span className="font-mono text-primary">988</span></span>
                </div>
              </div>
            ) : (
              /* Messages */
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    isStreaming={
                      isLoading &&
                      message === messages[messages.length - 1] &&
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
        <div className="sticky bottom-0 pt-4 pb-4 bg-gradient-to-t from-background via-background/95 to-transparent">
          <div className="max-w-3xl mx-auto px-4">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
            <p className="text-center text-[10px] text-muted-foreground/50 mt-2 font-mono">
              Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-[9px]">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 bg-muted rounded text-[9px]">Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
