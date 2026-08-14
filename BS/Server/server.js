const path = require("path");

const express = require("express");
const cors = require("cors");

const articleRoutes = require("./routes/articleRoutes");
const otpRoutes = require("./routes/otpRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/articles", articleRoutes);

app.use("/api", otpRoutes);

app.use("/", healthRoutes);

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
