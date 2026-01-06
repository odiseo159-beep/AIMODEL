"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, AgentContext, Agent } from "@/lib/agentEngine";

interface AIChatCardProps {
  className?: string;
  agent: Agent | null;
  agentId: string;
}

export default function AIChatCard({ className, agent, agentId }: AIChatCardProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (agent) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `👋 Hi, I'm ${agent.name}.\n\n${
          agent.systemStyle === 'crypto-native, fun, direct' 
            ? 'I\'m here to help you navigate the meme world with a solid risk framework. What would you like to know?'
            : 'I\'m here to help you understand probabilities and manage your bankroll responsibly. What game are you interested in?'
        }`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [agent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !agent) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const context: AgentContext = {
        bankroll: 1000,
        riskLevel: 'medium',
        messages: [...messages, userMessage],
      };

      const response = agent.respond(userMessage.content, context);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  if (!agent) {
    return <div className="text-white">Agent not found</div>;
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden flex flex-col [&_*]:border-0", className)}>
      {/* Inner Card */}
      <div className="relative flex flex-col w-full h-full overflow-hidden bg-black/90 backdrop-blur-xl min-h-0 border-0">
        {/* Inner Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-900"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            animate={{
              y: ["0%", "-140%"],
              x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{ left: `${Math.random() * 100}%`, bottom: "-10%" }}
          />
        ))}

        {/* Header */}
        <div className="px-4 py-3 relative z-10">
          <h2 className="text-lg font-semibold text-white">{agent.name}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 text-sm flex flex-col relative z-10 min-h-0">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "px-3 py-2 rounded-xl max-w-[80%] shadow-md backdrop-blur-md whitespace-pre-wrap",
                  msg.role === "assistant"
                    ? "bg-white/10 text-white self-start"
                    : "bg-white/30 text-black font-semibold self-end"
                )}
              >
                {msg.content.split('\n').map((line, idx) => {
                  const parts: (string | JSX.Element)[] = [];
                  let lastIndex = 0;
                  const boldRegex = /\*\*(.*?)\*\*/g;
                  let match;
                  
                  while ((match = boldRegex.exec(line)) !== null) {
                    if (match.index > lastIndex) {
                      parts.push(line.slice(lastIndex, match.index));
                    }
                    parts.push(<strong key={`bold-${idx}-${match.index}`}>{match[1]}</strong>);
                    lastIndex = match.index + match[0].length;
                  }
                  
                  if (lastIndex < line.length) {
                    parts.push(line.slice(lastIndex));
                  }
                  
                  return (
                    <div key={idx} className={idx > 0 ? 'mt-1' : ''}>
                      {parts.length > 0 ? parts : line}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* AI Typing Indicator */}
          {isTyping && (
            <motion.div
              className="flex items-center gap-1 px-3 py-2 rounded-xl max-w-[30%] bg-white/10 self-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-3 relative z-10">
          <input
            className="flex-1 px-3 py-2 text-sm bg-black/50 rounded-lg text-white placeholder:text-white/50 focus:outline-none border-0 outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            style={{ border: 'none', outline: 'none' }}
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border-0 outline-none"
            style={{ border: 'none', outline: 'none' }}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
