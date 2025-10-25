import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import { ContentModel, LinkModel, UserModel } from "./db";
import { Usermiddleware } from "./middleware";
import { JWT_PASSWORD, PORT } from "./config";
import { random } from "./utills";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ Username: username });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = await UserModel.create({
      Username: username,
      Password: password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({
    Username: username,
    Password: password,
  });

  if (!existingUser) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);

  res.status(200).json({ token });
});

app.post("/api/v1/content", Usermiddleware, async (req, res) => {
  try {
    const { link, title } = req.body;
    console.log("📝 Creating content:", { title, link, userId: req.user.id });

    // Validate required fields
    if (!link || !title) {
      return res.status(400).json({
        error: "Missing required fields: link and title are required",
      });
    }

    // Create content with user ID from middleware
    const content = await ContentModel.create({
      Title: title,
      link: link,
      userId: req.user.id, // Use req.user.id instead of req.body.userId
    });

    console.log("✅ Content created successfully:", content);

    res.status(201).json({
      message: "Content created successfully",
      content: content,
    });
  } catch (error) {
    console.error("❌ Error creating content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/v1/content", Usermiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // userId is set by Usermiddleware
    console.log("📥 Fetching content for user:", userId);

    const contents = await ContentModel.find({ userId: userId });

    console.log("📦 Found contents:", contents.length, "items");
    console.log("📋 Contents:", contents);

    res.status(200).json(contents);
  } catch (error) {
    console.error("❌ Error fetching content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/v1/content", Usermiddleware, async (req, res) => {
  try {
    const contentId = req.body.contentId;
    const userId = req.user.id; // userId is set by Usermiddleware

    if (!contentId) {
      return res.status(400).json({ error: "Content ID is required" });
    }

    const content = await ContentModel.findOneAndDelete({
      _id: contentId,
      userId: userId,
    });

    if (!content) {
      return res
        .status(404)
        .json({ error: "Content not found or unauthorized" });
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// using this endpoint to create or delete share link , the shareable link when hits the server will redirect to the content page of the second brain app
app.post("/api/v1/brain/share", Usermiddleware, async (req, res) => {
  const share = req.body.share;

  if (share) {
    // Check if a share link already exists for the user
    const existingLink = await LinkModel.findOne({
      userId: req.user.id, // userId is set by Usermiddleware
    });

    if (existingLink) {
      // If a share link already exists, give it back
      return res.json({
        message: "Share link already exists",
        link: `/api/v1/brain/${existingLink.hash}`, // Full shareable URL
      });
    } else {
      // Create a new share link
      const hashlink = random(10); // Generate a random hash for the link
      await LinkModel.create({
        userId: req.user.id, // userId is set by Usermiddleware
        hash: hashlink,
      });

      res.json({
        message: "Share link created",
        link: `/api/v1/brain/${hashlink}`, // Full shareable URL
      });
    }
  } else {
    await LinkModel.deleteOne({
      userId: req.user.id,
    });

    res.json({
      message: "Share link deleted testing ",
    });
  }
});

// url parameter to get the content of the user
app.get("/api/v1/brain/:sharelink", async (req, res) => {
  const hash = req.params.sharelink;

  const link = await LinkModel.findOne({
    hash: hash,
  });

  if (!link) {
    return res.status(401).json({ error: "Enter valid input" });
  }

  // got the userid
  const contents = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({
    contents: contents,
    user: {
      username: user.Username,
      id: user._id,
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
