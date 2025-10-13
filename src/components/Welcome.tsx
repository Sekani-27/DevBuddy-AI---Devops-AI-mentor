import { Button } from "@/components/ui/button";
import { Terminal, Cpu, Cloud, Code } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome = ({ onStart }: WelcomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Terminal className="w-12 h-12 text-primary animate-glow" />
            <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DevBuddy
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered DevOps tutor, guiding you from fundamentals to professional-level skills
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 mt-12">
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <Cpu className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold mb-2">Structured Learning</h3>
            <p className="text-muted-foreground">
              5 comprehensive phases taking you from basics to advanced DevOps concepts
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <Code className="w-8 h-8 text-secondary mb-3" />
            <h3 className="text-lg font-semibold mb-2">Hands-on Practice</h3>
            <p className="text-muted-foreground">
              Every lesson includes practical exercises and real-world examples
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <Cloud className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold mb-2">Real-world Analogies</h3>
            <p className="text-muted-foreground">
              Complex concepts explained through simple, relatable metaphors
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <Terminal className="w-8 h-8 text-secondary mb-3" />
            <h3 className="text-lg font-semibold mb-2">Conversational AI</h3>
            <p className="text-muted-foreground">
              Interactive learning with an AI that adapts to your pace
            </p>
          </div>
        </div>

        {/* Learning Path Preview */}
        <div className="bg-card border border-border rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Learning Journey</h2>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-primary">▸</span> Phase 1: Foundations
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-primary">▸</span> Phase 2: Automation & Containerization
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-primary">▸</span> Phase 3: Infrastructure & Cloud
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-primary">▸</span> Phase 4: Orchestration & Monitoring
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-primary">▸</span> Phase 5: Advanced DevOps & Projects
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-6 text-lg"
          >
            Start Learning →
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Ready to become a DevOps engineer? Let's begin!
          </p>
        </div>
      </div>
    </div>
  );
};
