const fs = require("fs");
require("dotenv").config();

const { ChromaClient } = require("chromadb");
const pdfParse = require("pdf-parse");
const { getEmbedding } = require("./ollamaEmbed");

async function buildVectorStore() {
  console.log("📄 Reading PDF...");

  const pdfPath = "./data/anatomy.pdf";

  if (!fs.existsSync(pdfPath)) {
    console.log("❌ PDF not found in /data folder");
    return;
  }

  const buffer = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(buffer);

  const text = pdfData.text;
  const chunks = text.match(/(.|[\r\n]){1,800}/g);

  console.log("✅ PDF Loaded. Total Chunks:", chunks.length);

  // ✅ Correct Chroma connection
  const client = new ChromaClient({
    host: "localhost",
    port: 8000,
  });

  // Delete old collection if exists
  try {
    await client.deleteCollection({ name: "medical-docs" });
    console.log("🗑️ Old collection deleted");
  } catch (e) {}

  // Create fresh collection
  const collection = await client.getOrCreateCollection({
    name: "medical-docs",
  });

  console.log("⏳ Creating embeddings + storing...");

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await getEmbedding(chunks[i]);

    if (!embedding) continue;

    await collection.add({
      ids: [`chunk-${i}`],
      documents: [chunks[i]],
      embeddings: [embedding],
    });

    if (i % 25 === 0) console.log("Stored chunk:", i);
  }

  console.log("🎉 Vector Store Built Successfully!");
}

buildVectorStore();
