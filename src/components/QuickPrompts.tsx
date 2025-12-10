import { cn } from "@/lib/utils";

interface QuickPromptsProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  { emoji: "😔", text: "I'm feeling stressed about exams" },
  { emoji: "😴", text: "I haven't been sleeping well" },
  { emoji: "🤔", text: "I need help managing my anxiety" },
  { emoji: "💭", text: "I just need someone to talk to" },
];

export function QuickPrompts({ onSelect }: QuickPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onSelect(prompt.text)}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5",
            "bg-card hover:bg-accent/50",
            "border border-border/50 hover:border-primary/30",
            "rounded-full text-sm text-muted-foreground hover:text-foreground",
            "transition-all duration-200",
            "shadow-soft hover:shadow-float",
            "animate-fade-in-up"
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <span>{prompt.emoji}</span>
          <span>{prompt.text}</span>
        </button>
      ))}
    </div>
  );
}
