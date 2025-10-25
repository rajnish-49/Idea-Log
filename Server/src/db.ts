import mongoose, { Mongoose, Schema, model } from "mongoose";
import { MONGODB_URI } from "./config";

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define schema
const UserSchema = new Schema({
  Username: { type: String, unique: true },
  Password: { type: String },
});

const ContentSchema = new Schema({
  Title: { type: String, required: true },
  link: { type: String, required: true },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

// Create model
const UserModel = model("User", UserSchema);
const ContentModel = model("Content", ContentSchema);
const LinkModel = model("Link", LinkSchema);

export { ContentModel, UserModel, LinkModel };
export { mongoose };
