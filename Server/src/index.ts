import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import { ContentModel, LinkModel, UserModel } from "./db";
import { Usermiddleware } from "./middleware";
import { JWT_PASSWORD, PORT } from "./config";
import { random } from "./utills";

const app = express();

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  console.log("Health check request received");
  res.json({ status: "Server is running" });
});

app.post("/api/v1/signup", async (req, res) => {
  try {
    console.log("🔵 Starting signup process");
    console.log("📦 Received request body:", req.body);
    const { username, password } = req.body;
    console.log("Parsed signup request for username:", username);

    if (!username || !password) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error(
        "MongoDB not connected. Current state:",
        mongoose.connection.readyState
      );
      return res.status(500).json({ error: "Database connection error" });
    }

    console.log("Checking if user exists:", username);
    const existingUser = await UserModel.findOne({ Username: username });
    if (existingUser) {
      console.log("User already exists:", username);
      return res.status(409).json({ error: "User already exists" });
    }

    console.log("Creating new user:", username);
    const user = await UserModel.create({
      Username: username,
      Password: password,
    });
    console.log("User created successfully:", user);

    const token = jwt.sign({ id: user._id }, JWT_PASSWORD);
    console.log("JWT token generated");

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        username: user.Username,
      },
    });
  } catch (error: any) {
    console.error("Error during signup:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error?.message || "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received signin request:", { username, password });

  if (!username || !password) {
    console.log("Missing username or password");
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    console.log("Searching for user in database with:", {
      Username: username,
      Password: password,
    });

    const user = await UserModel.findOne({ Username: username });
    console.log("Database search result:", user);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid username or password" });
    }

    if (user.Password !== password) {
      console.log("Password mismatch");
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_PASSWORD);
    console.log("Signin successful, generated token:", token);

    res.status(200).json({
      token,
      message: "Signin successful",
      user: {
        username: user.Username,
        id: user._id,
      },
    });
  } catch (error: any) {
    console.error("Error during signin:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error?.message || "Unknown error",
    });
  }
});

app.post("/api/v1/content", Usermiddleware, async (req, res) => {
  try {
    const { link, title } = req.body;
    console.log("📝 Creating content:", { title, link, userId: req.user.id });

    // Validate
    if (!link || !title) {
      return res.status(400).json({
        error: "Missing required fields: link and title are required",
      });
    }

    const content = await ContentModel.create({
      Title: title,
      link: link,
      userId: req.user.id,
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
    const userId = req.user.id; // this is  set by Usermiddleware
    console.log("📥 Fetching content for user:", userId);

    const contents = await ContentModel.find({
      userId: userId,
    });

    console.log("Found contents:", contents.length, "items");
    console.log(" Contents:", contents);

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

app.post("/api/v1/brain/share", Usermiddleware, async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.user.id, // userId is set by Usermiddleware
    });

    if (existingLink) {
      return res.json({
        message: "Share link already exists",
        link: `/api/v1/brain/${existingLink.hash}`, // Full shareable URL
      });
    } else {
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
  console.log(`Server is running on port ${PORT}`);
});
