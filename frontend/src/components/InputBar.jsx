import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, SendHorizontal } from "lucide-react";

export default function InputBar({ onSend, onMic }) {
  const [msg, setMsg] = useState("");

  function send() {
    if (!msg.trim()) return;
    onSend(msg);
    setMsg("");
  }

  return (
    <div className="flex gap-3 mt-6">
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Ask medical question..."
        className="flex-1 px-5 py-3 rounded-2xl bg-black/40 border border-cyan-400/30 text-cyan-200 placeholder:text-cyan-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-[0_0_20px_rgba(0,255,255,0.12)]"
      />

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={onMic}
        className="p-3 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 shadow-[0_0_20px_rgba(0,255,255,0.25)]"
      >
        <Mic size={22} />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={send}
        className="px-7 py-3 rounded-2xl bg-cyan-400 text-black font-bold tracking-wide shadow-[0_0_30px_rgba(0,255,255,0.6)]"
      >
        <SendHorizontal size={20} />
      </motion.button>
    </div>
  );
}
