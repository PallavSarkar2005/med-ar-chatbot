import { useRef } from "react";

export default function useSpeech() {
  const queueRef = useRef([]);
  const speakingRef = useRef(false);
  const bufferRef = useRef("");

  function reset() {
    speechSynthesis.cancel();
    queueRef.current = [];
    speakingRef.current = false;
    bufferRef.current = "";
  }

  function processQueue() {
    if (speakingRef.current) return;
    if (queueRef.current.length === 0) return;

    speakingRef.current = true;

    const text = queueRef.current.shift();
    const utter = new SpeechSynthesisUtterance(text);

    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;

    utter.onend = () => {
      speakingRef.current = false;
      processQueue();
    };

    speechSynthesis.speak(utter);
  }

  function speakStream(newPart) {
    bufferRef.current += newPart;

    const sentences = bufferRef.current.match(/[^.?!]+[.?!]+/g);

    if (!sentences) return;

    sentences.forEach((s) => queueRef.current.push(s.trim()));

    bufferRef.current = bufferRef.current.replace(
      sentences.join(""),
      ""
    );

    processQueue();
  }

  function startListening(onResult) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onResult(text);
    };
  }

  return { speakStream, reset, startListening };
}
