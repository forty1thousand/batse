"use client";
import { Line } from "@/app/components/line";
import { motion } from "framer-motion";

export default function () {
  return (
    <section className="bg-background relative py-4 h-fit">
      <motion.p
        initial={{ clipPath: "inset(0 0 0 100%)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        style={{ mixBlendMode: "difference" }}
        className="text-2xl font-thin text-left text-white"
      >
        Batse
      </motion.p>
      <div className="relative">
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
          className="text-7xl lg:text-9xl font-bold text-left relative text-white"
        >
          Book appointments online.
        </motion.p>
      </div>
      <Line className="my-4" dotted />
      <motion.p
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 1, ease: "easeIn" }}
        style={{ mixBlendMode: "difference" }}
        className="text-5xl font-medium text-left text-subtle pb-2"
      >
        The{" "}
        <span className="bg-clip-text invert dark:invert-0 text-transparent bg-gradient-to-tl from-rose-500 to-amber-500">
          simple
        </span>{" "}
        way to manage appointments & share booking links.
      </motion.p>
    </section>
  );
}
