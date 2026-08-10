const articles = require("../data/articles");

exports.getArticles = (req, res) => {
    const limit = Number(req.query.limit) || articles.length;
    const offset = Number(req.query.offset) || 0;

    const result = articles.slice(offset, offset + limit);

    res.json({
        success: true,
        total: articles.length,
        count: result.length,
        articles: result,
    });
};

exports.createArticle = (req, res) => {
    const {
        url,
        title,
        image,
        readTime = "5 min read",
        isPremium = false,
    } = req.body;

    if (!url || !title) {
        return res.status(400).json({
            success: false,
            error: "URL and title are required",
        });
    }

    const article = {
        url,
        title,
        image,
        readTime,
        isPremium,
    };

    articles.push(article);

    res.status(201).json({
        success: true,
        message: "Article added successfully",
        article,
    });
};
