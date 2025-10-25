// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

export const JWT_PASSWORD = process.env.JWT_SECRET || "12345";
export const MONGODB_URI = process.env.MONGODB_URI || "";
export const PORT = process.env.PORT || 3000;