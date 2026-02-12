require("dotenv").config();

// Ollama embedding function
async function getEmbedding(text) {
  const res = await fetch(`${process.env.OLLAMA_URL}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "nomic-embed-text", // ✅ embedding model
      prompt: text,
    }),
  });

  const data = await res.json();

  if (!data.embedding) {
    console.log("❌ Embedding failed:", data);
    return null;
  }

  return data.embedding;
}

module.exports = { getEmbedding };
