import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save, Trash2, Code, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type WorkspaceTab = "bash" | "docker" | "python" | "terraform" | "notes";

export const Workspace = () => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("bash");
  const [content, setContent] = useState<Record<WorkspaceTab, string>>({
    bash: "",
    docker: "",
    python: "",
    terraform: "",
    notes: "",
  });
  const { toast } = useToast();

  // Load saved content from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("devbuddy-workspace");
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load workspace:", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("devbuddy-workspace", JSON.stringify(content));
    toast({
      title: "Workspace saved",
      description: "Your work has been saved locally.",
    });
  };

  const handleClear = () => {
    setContent(prev => ({ ...prev, [activeTab]: "" }));
    toast({
      title: "Cleared",
      description: `${activeTab} workspace cleared.`,
    });
  };

  const handleContentChange = (value: string) => {
    setContent(prev => ({ ...prev, [activeTab]: value }));
  };

  const tabConfig: Record<WorkspaceTab, { label: string; icon: typeof Code; placeholder: string }> = {
    bash: {
      label: "Bash",
      icon: Terminal,
      placeholder: "# Practice bash commands and scripts here\n# Example:\nls -la\npwd\n",
    },
    docker: {
      label: "Docker",
      icon: Code,
      placeholder: "# Practice Docker commands here\n# Example:\ndocker build -t myapp .\ndocker run -p 8080:80 myapp\n",
    },
    python: {
      label: "Python",
      icon: Code,
      placeholder: "# Practice Python scripts here\n# Example:\nprint('Hello, DevOps!')\n",
    },
    terraform: {
      label: "Terraform",
      icon: Code,
      placeholder: "# Practice Terraform configs here\n# Example:\nresource \"aws_instance\" \"example\" {\n  ami = \"ami-123456\"\n}\n",
    },
    notes: {
      label: "Notes",
      icon: Code,
      placeholder: "Take notes about what you're learning...\n",
    },
  };

  return (
    <div className="flex flex-col h-full bg-background border-l border-border">
      <div className="border-b border-border p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
          Practice Workspace
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as WorkspaceTab)} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4">
          {Object.entries(tabConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <TabsTrigger
                key={key}
                value={key}
                className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Icon className="w-4 h-4" />
                {config.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(tabConfig).map(([key, config]) => (
          <TabsContent key={key} value={key} className="flex-1 p-4 m-0">
            <Card className="h-full border-border bg-card/50 backdrop-blur-sm">
              <Textarea
                value={content[key as WorkspaceTab]}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder={config.placeholder}
                className="h-full min-h-[500px] font-mono text-sm resize-none border-0 bg-transparent focus-visible:ring-0"
              />
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
