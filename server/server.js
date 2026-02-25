import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors());

// Fetch posts for a subreddit
app.get("/api/:subreddit", async (req, res) => {
  const { subreddit } = req.params;

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subreddit posts" });
  }
});

// Fetch comments for a specific post
app.get("/api/comments/:subreddit/:postId", async (req, res) => {
  const { subreddit, postId } = req.params;

  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});