import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ChatBox({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[340px] overflow-y-auto space-y-4 pr-2">
      {messages.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            m.sender === "user"
              ? "ml-auto bg-cyan-500/15 text-cyan-100 border border-cyan-400/20"
              : "mr-auto bg-fuchsia-500/10 text-fuchsia-200 border border-fuchsia-400/20"
          }`}
        >
          {m.text}
        </motion.div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
