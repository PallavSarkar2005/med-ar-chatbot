const axios = require("axios");

exports.streamOllama = async (prompt, res) => {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "phi3",
      prompt,
      stream: true,
    },
    { responseType: "stream" }
  );

  response.data.on("data", (chunk) => {
    const lines = chunk.toString().split("\n");

    for (const line of lines) {
      if (!line.trim()) continue;

      const json = JSON.parse(line);

      if (json.response) res.write(json.response);

      if (json.done) res.end();
    }
  });
};
