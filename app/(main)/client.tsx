"use client";
import { motion } from "framer-motion";

export default function () {
  return (
    <section className="bg-background relative py-4 h-fit">
      <motion.p
        initial={{ clipPath: "inset(0 0 0 100%)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        style={{ mixBlendMode: "difference" }}
        className="text-2xl font-medium text-left text-white"
      >
        Batse
      </motion.p>
      <motion.div
        className="h-full w-full absolute invert bg-background bottom-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { clipPath: "inset(0 0 0 0)" },
          visible: { clipPath: "inset(0 0 0 100%)" },
        }}
        transition={{ duration: 2, ease: "easeIn" }}
      />
      <motion.p
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ mixBlendMode: "difference" }}
        className="text-7xl lg:text-9xl font-bold text-left text-white"
      >
        Book appointments online.
      </motion.p>
      <motion.p
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 2, ease: "easeIn" }}
        style={{ mixBlendMode: "difference" }}
        className="text-5xl font-medium text-left text-subtle pb-2"
      >
        The simplest way — share booking links — manage appointments.
      </motion.p>
    </section>
  );
}
