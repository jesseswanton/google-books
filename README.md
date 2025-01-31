# Full-Stack Book Search Application

This is a full-stack application that allows users to search for books using the Google Books API, save books to their profile, and manage saved books in a personal library. The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and utilizes GraphQL for API queries and mutations.

## Features

- **Search for Books**: Users can search for books by title using the Google Books API.
- **Save Books**: Authenticated users can save books to their profile.
- **View Saved Books**: Users can view and delete books from their saved library.
- **User Authentication**: JWT-based authentication system with user login and signup.
- **Responsive Design**: The app is fully responsive and works across devices.

## Technologies Used

- **Frontend**:
  - React.js
  - Apollo Client (for GraphQL)
  - React-Bootstrap (UI components)
  - React Router (for navigation)
  - JWT (JSON Web Tokens) for user authentication
  - Local Storage (for storing book IDs and token)
  
- **Backend**:
  - Node.js with Express.js
  - MongoDB and Mongoose (for data storage)
  - Apollo Server (for handling GraphQL queries and mutations)
  - JWT-based Authentication

## Installation ### 

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book-search-app.git
cd book-search-app
```
### 2. Create a .env file in the root directory of the server project with the following variables:
```bash
MONGODB_URI=your-mongo-db-uri
JWT_SECRET=your-jwt-secret
```

### 3. Use npm install in your client and server folders.

### 4. Use npm develop in your root folder to run the client and server concurrently.

## Usage
Sign Up / Login: To start using the application, sign up or log in using the authentication form.
Search for Books: Use the search bar to find books by title. The results are fetched from the Google Books API.
Save Books: When logged in, you can save books to your profile by clicking the "Save this Book" button.
View Saved Books: Navigate to the "Saved Books" page to view your saved books and delete any books you no longer want in your library.

## GraphQL Endpoints

Queries:

me: Fetches the logged-in user's data and their saved books.

Mutations:

addBook(bookInput: BookInput): Saves a book to the user's library.

removeBook(bookId: ID!): Removes a book from the user's library.