import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

const phases = [
  {
    number: 1,
    title: "Foundations",
    topics: ["Introduction to DevOps", "Linux Fundamentals", "Git & GitHub"],
  },
  {
    number: 2,
    title: "Automation & Containerization",
    topics: ["Docker & Containers", "CI/CD Basics"],
  },
  {
    number: 3,
    title: "Infrastructure & Cloud",
    topics: ["Infrastructure as Code", "Cloud Fundamentals"],
  },
  {
    number: 4,
    title: "Orchestration & Monitoring",
    topics: ["Kubernetes", "Monitoring & Logging"],
  },
  {
    number: 5,
    title: "Advanced DevOps",
    topics: ["Security in DevOps", "Advanced Automation", "Capstone Project"],
  },
];

export const PhasesSidebar = () => {
  return (
    <aside className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Learning Path</h2>
        <p className="text-sm text-muted-foreground mt-1">5 Phases • DevOps Mastery</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {phases.map((phase) => (
            <div 
              key={phase.number}
              className="bg-muted/30 rounded-lg p-4 border border-border hover:border-primary transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {phase.number}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {phase.title}
                  </h3>
                  <ul className="space-y-1">
                    {phase.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center font-mono">
          Progress: 0/5 phases
        </div>
      </div>
    </aside>
  );
};
