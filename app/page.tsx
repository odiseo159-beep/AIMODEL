"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/LoadingScreen"
import { AgentSlider } from "@/components/ui/agent-slider"
import { SocialIcons } from "@/components/ui/social-icons"
import { MusicToggleButton } from "@/components/ui/music-toggle-btn"
import { AnimatedTitle } from "@/components/ui/animated-title"

const AGENTS = [
  {
    id: "memes",
    name: "MEME SAGE",
    description: "Crypto-native meme coin analysis and risk framework",
    imageSrc: "/images/memes.jpg",
    backgroundSrc: "/images/memes2.jpg",
    disabled: false,
  },
  {
    id: "casino",
    name: "EDGE CALCULATOR",
    description: "House edge analysis and responsible betting strategies",
    imageSrc: "/images/casino.jpg",
    backgroundSrc: "/images/casino2.jpg",
    disabled: false,
  },
  {
    id: "sport",
    name: "SPORTS ANALYST",
    description: "Coming soon...",
    imageSrc: "/images/sport.jpg",
    backgroundSrc: "/images/sport2.jpg",
    disabled: true,
  },
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [activeAgentId, setActiveAgentId] = useState<string>("memes")

  const handleAgentSelect = (agent: (typeof AGENTS)[0]) => {
    if (!agent.disabled) {
      router.push(`/agents/${agent.id}`)
    }
  }

  const handleActiveChange = (agent: (typeof AGENTS)[0]) => {
    setActiveAgentId(agent.id)
  }

  const getBackgroundImage = () => {
    const activeAgent = AGENTS.find((a) => a.id === activeAgentId)
    return activeAgent?.backgroundSrc || "/images/memes2.jpg"
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className="min-h-screen relative overflow-hidden">
          <div
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${getBackgroundImage()})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50" />
          </div>

          <div className="relative z-10">
            <div className="absolute top-12 left-0 right-0 z-20 flex justify-center">
              <AnimatedTitle agentType={activeAgentId as "memes" | "casino" | "sport"} />
            </div>

            <div className="absolute top-8 right-8 z-20">
              <SocialIcons />
            </div>

            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20">
              <MusicToggleButton />
            </div>

            <AgentSlider
              agents={AGENTS}
              autoplay={false}
              onSelect={handleAgentSelect}
              onActiveChange={handleActiveChange}
            />
          </div>
        </div>
      )}
    </>
  )
}
