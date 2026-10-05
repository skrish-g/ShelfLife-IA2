# ShelfLife — Library Management System

ShelfLife is a simple full-stack library management system developed for IA2.

The system allows a librarian to authenticate, view books, issue books to members, and view member borrowing history.

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

### Frontend

- React
- TypeScript
- Bootstrap
- React Router
- Vite

## Implemented Requirements

This project implements the required tasks specified in the IA2 assessment.

### Backend

- Book and Member management APIs
- BorrowRecord management
- Book listing with pagination
- Genre filtering
- Book issuing
- Book returning
- Member borrowing history
- JWT-based librarian authentication
- Request logging middleware
- Input validation using manual checks
- Centralized error handling
- Atomic book-issue operation to prevent negative `availableCopies`

### Frontend

- Librarian login
- Protected routes
- Book List
- Title search
- Genre filtering
- Issue Book form
- Member History
- Loading and error states
- Success/error feedback
- TypeScript interfaces
- Reusable typed UI components

> **Scope:** Only the tasks required by the IA2 assessment have been implemented. Additional library-management features were intentionally not added.

## Main API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/login` | Librarian login |
| POST | `/api/books` | Add a new book |
| GET | `/api/books` | List books with pagination/filtering |
| POST | `/api/members` | Register a member |
| POST | `/api/borrow` | Issue a book |
| POST | `/api/return/:borrowId` | Return a book |
| GET | `/api/members/:id/history` | View member borrowing history |

## Authentication

The application uses JWT-based authentication.

The librarian logs in through:

```text
POST /api/auth/login
```

The backend returns a JWT token after successful authentication.

The token is sent with protected API requests using:

```text
Authorization: Bearer <token>
```

The frontend also protects application routes and redirects unauthenticated users to the login page.

## Middleware

The backend contains middleware for:

- Request logging
- Manual input validation
- Centralized error handling
- JWT authentication for protected operations

### Request Logging

The logging middleware records the HTTP method and requested URL.

Example:

```text
POST /api/borrow
GET /api/books?page=1&limit=10
```

### Input Validation

Manual validation is used to check required request fields before controller logic is executed.

### Centralized Error Handling

Application errors are passed to a centralized error-handling middleware which returns a consistent JSON response.

## Database

MongoDB Atlas is used as the database.

The main Mongoose models are:

```text
Book
Member
BorrowRecord
```

`BorrowRecord` references both a `Book` and a `Member`.

### Book

Stores information such as:

- Title
- Author
- ISBN
- Genre
- Total copies
- Available copies

### Member

Stores information such as:

- Name
- Email
- Membership ID
- Joined date

### BorrowRecord

Stores information about a borrowing transaction, including:

- Book
- Member
- Issue date
- Due date
- Return date
- Status

## Book Issue Logic

When a book is issued, the backend checks that:

```text
availableCopies > 0
```

The availability check and decrement are performed atomically in MongoDB.

This prevents `availableCopies` from becoming negative when multiple issue requests happen concurrently.

For example:

```text
availableCopies = 1

Request A → successfully issues the book → 0
Request B → cannot issue the book
```

## Frontend

The frontend provides the required librarian-facing screens:

```text
Login
Book List
Issue Book
Member History
```

### Book List

The Book List displays books retrieved from the backend and supports:

- Title search
- Genre filtering
- Loading state
- Error state

### Issue Book

The Issue Book form allows the librarian to:

- Select a book
- Select a member
- Set a due date
- Issue the book

### Member History

The Member History page displays borrowing records for a selected member and shows different statuses using Bootstrap styling.

## Project Structure

```text
ShelfLife-IA2/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── answers/
│   ├── Q1_Backend_Answers.pdf
│   ├── Q2_Frontend_Answers.pdf
│   └── Q3_System_Design_Answers.pdf
│
├── .gitignore
└── README.md
```

## Written Answers

The written answers for the IA2 assessment are provided separately as PDF files inside the `answers/` folder.

```text
answers/
├── Q1_Backend_Answers.pdf
├── Q2_Frontend_Answers.pdf
└── Q3_System_Design_Answers.pdf
```

The PDFs contain the answers for:

- Q1 — Backend
- Q2 — Frontend
- Q3 — System Design

## Running the Project

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account

### Backend Setup

Open a terminal and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

LIBRARIAN_EMAIL=your_librarian_email
LIBRARIAN_PASSWORD=your_librarian_password
```

Start the backend:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will display the local frontend URL in the terminal.

Open that URL in the browser.

## Environment Variables

The backend requires the following environment variables:

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `LIBRARIAN_EMAIL` | Librarian login email |
| `LIBRARIAN_PASSWORD` | Librarian login password |

### Security

The actual `.env` file must not be committed to GitHub.

Database credentials, JWT secrets, and login credentials should remain private.

## System Design

For the large-scale system-design scenario, the proposed architecture uses:

- React client
- CDN
- Load balancer
- Multiple Node.js/Express API servers
- Redis cache
- MongoDB cluster
- MongoDB sharding
- Horizontal autoscaling

The detailed Q3 system-design answer and architecture are provided in:

```text
answers/Q3_System_Design_Answers.pdf
```

## Assessment Scope

This project intentionally focuses on the requirements specified in the IA2 assessment.

The implementation does **not** attempt to build a complete production-level library management platform.

Features that were not explicitly required by the assessment were intentionally kept out to maintain a simple and understandable implementation.

## Author

Developed as part of the Full Stack Web Development IA2 assessment.