const express = require("express");
const path = require("path");

// ✅ Load environment variables from server/.env
require("dotenv").config({ path: path.join(__dirname, ".env") });

// ✅ Use node-fetch for Node < 18
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3000;

// ✅ Serve static files from client folder
app.use(express.static(path.join(__dirname, "../client")));

// ✅ Check if API key is loaded
const apiKey = process.env.NEWS_API_KEY;
console.log("API KEY IS:", apiKey);

if (!apiKey) {
  console.error("❌ NEWS_API_KEY is missing in .env file!");
}

// ✅ /news route for fetching news articles
app.get("/news", async (req, res) => {
  const query = req.query.q || "Tamil Nadu";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&apiKey=${apiKey}`
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "News fetch failed", detail: error.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

