const { streamOllama } = require("../config/ollama");

exports.chatWithBot = async (req, res) => {
  try {
    const message = req.body.message?.trim();
    if (!message) return res.end();

    const prompt = `
Reply in 1 short line only.

Q: ${message}
A:
`;

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    await streamOllama(prompt, res);
  } catch {
    res.end("Error.");
  }
};
