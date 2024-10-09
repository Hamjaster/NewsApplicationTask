const express = require("express");
const axios = require("axios");
const apicache = require("apicache");
const cors = require("cors");

const app = express();

// Apply CORS middleware
app.use(cors());
let cache = apicache.middleware;

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = "fe9deb34dd4742f3b67fd26adf9decdb";

// Endpoint for news which caches the data for 10 minutes
app.get("/api/news", cache("10 minutes"), async (req, res) => {
  try {
    // Fetch news from the News API
    const response = axios
      .get(NEWS_API_URL, {
        params: {
          apiKey: API_KEY,
          country: "us",
        },
      })
      .then((data) => {
        res.json(data.data.articles.filter((article) => article.source.id));
      });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching news", error });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Some unexpected error occured!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
