"use client"
import { motion } from "framer-motion"
import CornerFrameScrambleText from "@/components/ui/corner-frame-scramble-text"

interface AnimatedTitleProps {
  agentType: "memes" | "casino" | "sport"
}

export const AnimatedTitle = ({ agentType }: AnimatedTitleProps) => {
  const colorSchemes = {
    memes: "#00ff88", // Cyan/green for crypto vibes
    casino: "#ffd700", // Gold for casino luxury
    sport: "#ff6b35", // Orange for sports energy
  }

  const frameColor = colorSchemes[agentType]

  return (
    <motion.div
      key={agentType}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="select-none"
    >
      <CornerFrameScrambleText
        value="GAMBLE AI MODELS"
        as="h1"
        frameColor={frameColor}
        className="text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-wider"
      />
    </motion.div>
  )
}
