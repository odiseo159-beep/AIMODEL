'use client';

import { getAgent } from '@/lib/agentEngine';
import AIChatCard from '@/components/ui/ai-chat';
import Image from 'next/image';

interface ChatWindowProps {
  agentId: string;
}

export default function ChatWindow({ agentId }: ChatWindowProps) {
  const agent = getAgent(agentId);

  // Get agent image
  const agentImage = agentId === 'memes' ? '/images/memes.jpg' : agentId === 'casino' ? '/images/casino.jpg' : null;

  if (!agent) {
    return <div className="text-white">Agent not found</div>;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden fixed inset-0">
      {/* Left Side - Agent Image */}
      <div className="w-1/2 relative overflow-hidden h-full flex-shrink-0">
        {agentImage ? (
          <>
            <Image
              src={agentImage}
              alt={agent.name}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/40" />
          </>
        ) : (
          <div className="w-full h-full bg-slate-900/50 flex items-center justify-center">
            <p className="text-slate-500 text-xl">No image available</p>
          </div>
        )}
      </div>

      {/* Right Side - Chat */}
      <div className="w-1/2 flex items-center justify-center h-full flex-shrink-0 p-0">
        <AIChatCard 
          agent={agent}
          agentId={agentId}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
