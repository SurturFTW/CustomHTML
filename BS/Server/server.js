const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS so your HTML can fetch from this endpoint
app.use(cors());
app.use(express.json());

// Sample articles data
const sampleArticles = [
  {
    url: "https://www.business-standard.com/industry/news/us-bangladesh-trade-deal-india-textile-cotton-exports-impact-126021001506_1.html",
    image:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2026-02/10/full/1770746919-6775.jpg?im=FitAndFill=(826,465)",
    title:
      "US-Bangladesh pact to put India's textile, cotton exports in a spot",
    readTime: "5 min read",
    isPremium: true,
  },
  {
    url: "https://www.business-standard.com/companies/people/ai-delivering-real-world-scientific-outcomes-deepmind-v-p-pushmeet-kohli-126021001665_1.html",
    image:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2026-02/10/full/1770741937-2029.jpg?im=FitAndFill=(826,465)",
    title: "AI delivering real-world scientific outcomes: Google DeepMind exec",
    readTime: "7 min read",
    isPremium: true,
  },
  {
    url: "https://www.business-standard.com/technology/tech-news/it-ministry-shortens-takedown-timelines-intermediaries-ai-content-rules-126021001625_1.html",
    image:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2026-02/10/full/1770748001-7117.jpg?im=FitAndFill=(826,465)",
    title:
      "Govt toughens rules on AI content, mandates 3-hour takedown timeline",
    readTime: "3 min read",
    isPremium: true,
  },
  {
    url: "https://www.business-standard.com/economy/news/datanomics-500-billion-imports-in-five-years-need-3-75x-increase-126021001318_1.html",
    image:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2025-11/17/full/1763400871-8563.jpg?im=FitAndFill=(826,465)",
    title: "Datanomics: $500 billion imports in five years need 3.75x increase",
    readTime: "2 min read",
    isPremium: true,
  },
  {
    url: "https://www.business-standard.com/finance/news/commercial-banks-reap-windfall-from-surplus-liquidity-arbitrage-126021001624_1.html",
    image:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2025-12/16/full/1765906741-3834.jpg?im=FitAndFill=(826,465)",
    title: "Commercial banks reap windfall from surplus liquidity arbitrage",
    readTime: "4 min read",
    isPremium: true,
  },
  {
    url: "https://www.business-standard.com/markets/news/valuation-dixon-technologies-factors-multiple-headwinds-126021001501_1.html",
    image:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2025-07/21/full/1753117923-4204.jpg?im=FitAndFill=(826,465)",
    title:
      "Dixon Technologies valuation reflects headwinds amid demand slowdown",
    readTime: "3 min read",
    isPremium: true,
  },
];

// GET endpoint to fetch articles
app.get("/api/articles", (req, res) => {
  // You can add query parameters for filtering, pagination, etc.
  const limit = parseInt(req.query.limit) || sampleArticles.length;
  const offset = parseInt(req.query.offset) || 0;

  const articles = sampleArticles.slice(offset, offset + limit);

  res.json({
    success: true,
    total: sampleArticles.length,
    count: articles.length,
    articles: articles,
  });
});

// POST endpoint to add new articles (optional)
app.post("/api/articles", (req, res) => {
  const newArticle = req.body;

  // Validate required fields
  if (!newArticle.url || !newArticle.title) {
    return res.status(400).json({
      success: false,
      error: "URL and title are required",
    });
  }

  // Add default values if not provided
  newArticle.readTime = newArticle.readTime || "5 min read";
  newArticle.isPremium =
    newArticle.isPremium !== undefined ? newArticle.isPremium : false;

  sampleArticles.push(newArticle);

  res.status(201).json({
    success: true,
    message: "Article added successfully",
    article: newArticle,
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📰 Articles endpoint: http://localhost:${PORT}/api/articles`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});
