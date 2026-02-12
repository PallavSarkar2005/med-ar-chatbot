import { motion } from "framer-motion";

export default function TypingLoader() {
  return (
    <motion.div
      className="flex gap-2 mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-cyan-300"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </motion.div>
  );
}
