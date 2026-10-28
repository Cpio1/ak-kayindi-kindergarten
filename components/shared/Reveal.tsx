"use client";

import { motion, type HTMLMotionProps } from "motion/react";

// Мягкое появление при прокрутке. При prefers-reduced-motion MotionConfig
// отключает смещение, остаётся только смена прозрачности.

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ delay = 0, y = 18, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease, delay }}
      {...props}
    />
  );
}

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Stagger({ as = "div", ...props }: HTMLMotionProps<"div"> & { as?: "div" | "ul" }) {
  // Приведение к motion.div — пропсы у ul/div совпадают по смыслу
  const Comp = (as === "ul" ? motion.ul : motion.div) as typeof motion.div;
  return (
    <Comp
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      {...props}
    />
  );
}

export function StaggerItem({ as = "div", ...props }: HTMLMotionProps<"div"> & { as?: "div" | "li" }) {
  const Comp = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return <Comp variants={staggerChild} {...props} />;
}
