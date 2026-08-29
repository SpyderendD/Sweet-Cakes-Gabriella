import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Setări pentru elasticitatea dublă de tip lichid
  const springConfig = { stiffness: 450, damping: 28, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const outerSpringConfig = { stiffness: 180, damping: 22, mass: 0.9 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button, input, textarea, [role='button'], .interactive, img")) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter]);

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 hidden md:block">
      {/* Punct central magnetic de tip lichid */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-brand-magenta rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 15 }}
      />
      {/* Inel exterior cu lag magnetic satisfăcător */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-1.5 border-brand-magenta rounded-full mix-blend-difference"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          opacity: isVisible ? (isHovering ? 0 : 0.6) : 0,
          borderWidth: isHovering ? 0 : 1.5,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      />
      {/* Aură fină de lumină (Glow Glow) pentru adâncime */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-brand-magenta/5 rounded-full blur-2xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
      />
    </div>
  );
}