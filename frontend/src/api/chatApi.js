export async function streamChat(message, onChunk) {
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let fullText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const newPart = decoder.decode(value, { stream: true });
    fullText += newPart;

    onChunk(newPart, fullText);
  }
}
