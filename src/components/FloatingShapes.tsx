import { motion } from "motion/react";
import { Star, Heart, Sparkles, Cloud } from "lucide-react";

export function FloatingShapes() {
  const shapes = [
    { Icon: Star, color: "text-pastel-pink", size: 40, top: "10%", left: "5%", delay: 0 },
    { Icon: Heart, color: "text-pastel-blue", size: 30, top: "20%", right: "10%", delay: 1 },
    { Icon: Sparkles, color: "text-pastel-lavender", size: 35, bottom: "15%", left: "15%", delay: 2 },
    { Icon: Cloud, color: "text-pastel-cream", size: 50, bottom: "10%", right: "5%", delay: 1.5 },
    { Icon: Star, color: "text-pastel-rose", size: 25, top: "40%", left: "2%", delay: 0.5 },
    { Icon: Heart, color: "text-pastel-pink", size: 20, bottom: "40%", right: "2%", delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.color} opacity-20`}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <shape.Icon size={shape.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
