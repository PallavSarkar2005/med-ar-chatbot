const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  host: "127.0.0.1",
  port: 8000,
});

module.exports = client;
