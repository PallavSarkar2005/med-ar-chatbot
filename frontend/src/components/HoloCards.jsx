import { motion } from "framer-motion";

export default function HoloCards() {
  const cards = [
    "💓 Heart Rate: Stable",
    "🧠 Brain Scan: Active",
    "🩻 Anatomy Loaded",
  ];

  return (
    <div className="flex gap-4 mb-6 z-10">
      {cards.map((text, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          className="px-5 py-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-100 shadow-[0_0_25px_rgba(0,255,255,0.15)] text-sm"
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
}
