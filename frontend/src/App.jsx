import { useState } from "react";
import RadarBackground from "./components/RadarBackground";
import HoloCards from "./components/HoloCards";
import ChatBox from "./components/ChatBox";
import InputBar from "./components/InputBar";
import { streamChat } from "./api/chatApi";
import useSpeech from "./hooks/useSpeech";

export default function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to MED-AR Assistant." },
  ]);

  const { speakStream, reset, startListening } = useSpeech();

  async function handleSend(text) {
    if (!text.trim()) return;

    reset();

    setMessages((p) => [...p, { sender: "user", text }]);
    setMessages((p) => [...p, { sender: "bot", text: "" }]);

    await streamChat(text, (newPart, fullText) => {
      setMessages((p) => [
        ...p.slice(0, -1),
        { sender: "bot", text: fullText },
      ]);

      speakStream(newPart);
    });
  }

  function handleMic() {
    startListening((speechText) => handleSend(speechText));
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#020024] to-black text-white overflow-hidden px-4">
      <RadarBackground />

      <h1 className="text-6xl font-extrabold text-cyan-300 drop-shadow-[0_0_60px_cyan] tracking-widest z-10">
        🩺 MED-AR BOT
      </h1>

      <p className="text-cyan-200/60 mt-3 mb-8 z-10">
        AR + Voice Medical AI Assistant
      </p>

      <HoloCards />

      <div className="w-full max-w-4xl p-10 rounded-[2.5rem] border border-cyan-400/20 bg-white/5 backdrop-blur-2xl shadow-[0_0_90px_rgba(0,255,255,0.2)] z-10">
        <ChatBox messages={messages} />
        <InputBar onSend={handleSend} onMic={handleMic} />
      </div>

      <p className="mt-8 text-sm text-cyan-200/30 tracking-widest z-10">
        ⚡ Powered by Ollama Streaming + Voice Engine
      </p>
    </div>
  );
}
