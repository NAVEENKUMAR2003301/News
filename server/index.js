const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = 5000;
const API_KEY = process.env.NEWS_API_KEY;

app.get("/news", async (req, res) => {
  const query = req.query.q || "Tamil Nadu";
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=40&apiKey=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "News API error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
