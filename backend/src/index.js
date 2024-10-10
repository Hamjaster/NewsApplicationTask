const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/newsRoutes");
const apicache = require("apicache");
const { handleError } = require("./middlewares");
const app = express();
let cache = apicache.middleware;

// All Middlwares
app.use(cors());
app.use(cache("10 minutes"));
app.use(handleError);

// All Routes
app.use("/api/news", newsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
