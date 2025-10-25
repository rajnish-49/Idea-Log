# 🧠 Second Brain - Backend Server

Node.js + Express + TypeScript backend API for the Second Brain content management system.

## 📋 Features

- RESTful API with Express
- MongoDB database with Mongoose ODM
- JWT-based authentication
- TypeScript for type safety
- CORS enabled for cross-origin requests
- Environment-based configuration

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
Server/
├── src/
│   ├── config.ts       # Configuration and env variables
│   ├── db.ts           # Database models and connection
│   ├── index.ts        # Express app and routes
│   ├── middleware.ts   # Authentication middleware
│   └── utills.ts       # Utility functions
├── build/              # Compiled JavaScript (generated)
├── .env                # Environment variables (not in git)
├── .env.example        # Environment template
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your values
   nano .env
   ```

3. **Required Environment Variables**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secondbrain
   JWT_SECRET=your_secure_random_string_here
   PORT=3000
   ```

4. **Build and run**
   ```bash
   # Build TypeScript
   npm run build
   
   # Start server
   npm start
   
   # Or build and start in one command
   npm run dev
   ```

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### 1. Sign Up
```http
POST /api/v1/signup
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "yourpassword"
}
```

**Response (201 Created)**
```json
{
  "_id": "user_id",
  "Username": "user@example.com",
  "Password": "yourpassword"
}
```

#### 2. Sign In
```http
POST /api/v1/signin
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "yourpassword"
}
```

**Response (200 OK)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Content Management Endpoints

**Note**: All content endpoints require authentication. Include JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

#### 3. Create Content
```http
POST /api/v1/content
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Amazing Article",
  "link": "https://example.com/article"
}
```

**Response (201 Created)**
```json
{
  "message": "Content created successfully",
  "content": {
    "_id": "content_id",
    "Title": "Amazing Article",
    "link": "https://example.com/article",
    "userId": "user_id"
  }
}
```

#### 4. Get All Content
```http
GET /api/v1/content
Authorization: Bearer <token>
```

**Response (200 OK)**
```json
[
  {
    "_id": "content_id",
    "Title": "Amazing Article",
    "link": "https://example.com/article",
    "userId": "user_id",
    "tags": []
  }
]
```

#### 5. Delete Content
```http
DELETE /api/v1/content
Authorization: Bearer <token>
Content-Type: application/json

{
  "contentId": "content_id"
}
```

**Response (200 OK)**
```json
{
  "message": "Content deleted successfully"
}
```

### Sharing Endpoints

#### 6. Create/Delete Share Link
```http
POST /api/v1/brain/share
Authorization: Bearer <token>
Content-Type: application/json

{
  "share": true  // true to create, false to delete
}
```

**Response (200 OK)**
```json
{
  "message": "Share link created",
  "link": "/api/v1/brain/abc123xyz"
}
```

#### 7. Access Shared Content
```http
GET /api/v1/brain/:sharelink
```

**Response (200 OK)**
```json
{
  "contents": [
    {
      "_id": "content_id",
      "Title": "Amazing Article",
      "link": "https://example.com/article",
      "userId": "user_id"
    }
  ],
  "user": {
    "username": "user@example.com",
    "id": "user_id"
  }
}
```

## 🗄️ Database Models

### User Model
```typescript
{
  Username: String (unique),
  Password: String
}
```

### Content Model
```typescript
{
  Title: String (required),
  link: String (required),
  tags: [ObjectId] (ref: Tag),
  userId: ObjectId (ref: User, required)
}
```

### Link Model
```typescript
{
  hash: String,
  userId: ObjectId (ref: User, required, unique)
}
```

## 🔧 Development Scripts

```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Build and start (development)
npm run dev

# Run tests (if available)
npm test
```

## 🔐 Security Considerations

**Current Implementation:**
- ⚠️ Passwords are stored in plain text (NOT SECURE)
- ⚠️ Basic JWT authentication
- ⚠️ CORS enabled for all origins

**For Production Use, Implement:**
- ✅ Password hashing with bcrypt
- ✅ Rate limiting
- ✅ Input validation and sanitization
- ✅ Helmet.js for security headers
- ✅ Environment-specific CORS configuration
- ✅ HTTPS/TLS encryption
- ✅ Error handling without exposing sensitive info
- ✅ Database connection pooling
- ✅ Request logging
- ✅ API versioning
- ✅ Token refresh mechanism

## 🐛 Error Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (missing fields)
- **401**: Unauthorized (invalid credentials)
- **404**: Not Found
- **409**: Conflict (user already exists)
- **500**: Internal Server Error

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secure_random_string` |
| `PORT` | Server port number | `3000` |

## 🤝 Contributing

1. Ensure TypeScript compiles without errors
2. Follow the existing code style
3. Test all endpoints before committing
4. Update documentation for any API changes

## 📄 License

MIT License - See root project README for details

## 🔗 Related

- [Client README](../Client/README.md)
- [Root Project README](../README.md)

