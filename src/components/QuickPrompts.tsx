import { cn } from "@/lib/utils";

interface QuickPromptsProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  { emoji: "😔", text: "I'm feeling stressed" },
  { emoji: "😴", text: "Can't sleep well" },
  { emoji: "😰", text: "Feeling anxious" },
  { emoji: "💬", text: "Just need to talk" },
];

export function QuickPrompts({ onSelect }: QuickPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center stagger-children">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onSelect(prompt.text)}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5",
            "glass-card hover:bg-accent/30",
            "hover:border-primary/30",
            "rounded-full text-sm text-muted-foreground hover:text-foreground",
            "transition-all duration-300",
            "hover:scale-105 hover:glow-effect-subtle"
          )}
        >
          <span className="text-base">{prompt.emoji}</span>
          <span className="font-medium">{prompt.text}</span>
        </button>
      ))}
    </div>
  );
}
