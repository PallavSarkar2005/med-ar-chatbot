import { motion } from "framer-motion";

export default function RadarBackground() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute w-[700px] h-[700px] rounded-full border border-cyan-400/20 shadow-[0_0_120px_rgba(0,255,255,0.15)] opacity-20"
    />
  );
}
