import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 30, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const outerSpringConfig = { stiffness: 200, damping: 20, mass: 0.8 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button, input, textarea, [role='button'], .interactive")) {
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
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full mix-blend-difference"
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
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full mix-blend-difference"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? (isHovering ? 0 : 0.8) : 0,
          borderWidth: isHovering ? 0 : 2,
        }}
      />
      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 bg-pastel-rose/10 rounded-full blur-xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 0.4 : 0,
        }}
      />
    </div>
  );
}
