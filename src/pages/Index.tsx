import { useState } from "react";
import { Welcome } from "@/components/Welcome";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return hasStarted ? <ChatInterface /> : <Welcome onStart={() => setHasStarted(true)} />;
};

export default Index;
