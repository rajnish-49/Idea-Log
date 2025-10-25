import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

declare global {
  namespace Express {
    interface Request {
      user: { id: string };
    }
  }
}

export const Usermiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    
    // Check if authorization header exists
    if (!header) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Extract token from "Bearer <token>" format
    const token = header.startsWith("Bearer ") ? header.slice(7) : header;
    
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_PASSWORD) as { id: string };
    
    // Set user information in request object
    req.user = { id: decoded.id };
    next();
    
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default Usermiddleware;