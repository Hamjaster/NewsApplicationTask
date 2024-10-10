const { API_KEY, NEWS_API_URL } = require("../constants");

const axios = require("axios");

const getNews = (req, res) => {
  try {
    // Fetch news from the News API
    axios
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
};

module.exports = {
  getNews,
};
