# Book Service - Library Management System

A production-ready Node.js microservice for managing books in a library system, built with Express.js and MongoDB.

## 🚀 Features
- **Full CRUD Operations**: Create, Read, Update, and Delete books.
- **Mongoose ODM**: Structured data modeling with strict validation.
- **Swagger Documentation**: Interactive API testing and documentation.
- **Global Error Handling**: Standardized error responses (404, 400, 500).
- **Security**: CORS enabled and environment variable security.

## 🛠️ Technology Stack
- **Runtime**: Node.js (Latest LTS)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Documentation**: Swagger (swagger-jsdoc & swagger-ui-express)
- **Environment**: dotenv
- **CORS**: Enabled

## 📂 Folder Structure
```text
book-service/
├── config/
│   └── db.js               # MongoDB connection configuration
├── controllers/
│   └── bookController.js   # Logic for API endpoints (CRUD)
├── middleware/
│   └── errorHandler.js     # Standardized error management
├── models/
│   └── Book.js             # Mongoose Schema for Book entity
├── routes/
│   └── bookRoutes.js       # Express routes with Swagger annotations
├── swagger/
│   └── swagger.js          # Swagger configuration and setup
├── .env                    # Actual environment variables (local only)
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
└── server.js               # Main entry point
```

## ⚙️ Configuration
1. **Database**: The service connects to a local MongoDB instance by default.
2. **Environment**: Create a `.env` file in the root directory (copied from `.env.example`).
   ```env
   PORT=8081
   MONGO_URI=mongodb://localhost:27017/bookdb
   NODE_ENV=development
   ```

## 🏁 How to Run

### Prerequisites
- Node.js installed
- MongoDB server running locally

### Installation Steps
1. Navigate to the project directory:
   ```bash
   cd book-service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the service:
   ```bash
   npm start
   ```
4. (Optional) Run in development mode with nodemon:
   ```bash
   npm run dev
   ```

## ✅ How to Check

### 1. Check the Terminal
When you run `npm start` or `npm run dev`, you should see the following logs:
```text
Book Service running on port 8081
Swagger docs available at http://localhost:8081/api-docs
MongoDB Connected: localhost
```
If you see **"MongoDB Connected,"** the connection is successful.

### 2. Interactive Documentation (Recommended)
Open your web browser and visit:
👉 **[http://localhost:8081/api-docs](http://localhost:8081/api-docs)**

This is the **Swagger UI**. You can:
- Expand an endpoint (e.g., `POST /api/books`).
- Click **"Try it out"**.
- Edit the sample JSON body (add a title, author, and isbn).
- Click **"Execute"** to send the request and see the live response.

### 3. Quick Health Check
Visit this link in your browser:
👉 **[http://localhost:8081/](http://localhost:8081/)**

You should see a message like:
```json
{"message": "Welcome to the Library Management - Book Service"}
```

### 4. Direct API Call (Using CLI)
To list all books using a command line, run this in a second terminal:
```bash
curl http://localhost:8081/api/books
```

### Endpoints
- `GET    /api/books`     → List all books
- `POST   /api/books`     → Create a new book
- `GET    /api/books/:id` → Get a single book by ID
- `PUT    /api/books/:id` → Update a book (partial updates allowed)
- `DELETE /api/books/:id` → Delete a book

## 📝 Implementation Details

### Book Schema
The Book entity includes strict validation for the following fields:
- **title**: String, required, trimmed.
- **author**: String, required, trimmed.
- **isbn**: String, unique, required, trimmed.
- **publishedYear**: Number (validated range).
- **available**: Boolean (default: true).
- **timestamps**: Automatically adds `createdAt` and `updatedAt`.

### Error Handling
Standard JSON error responses are provided for all failures:
```json
{
  "success": false,
  "error": "Book not found"
}
```
