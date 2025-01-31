import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        savedBooks {
          bookId
          authors
          description
          title
          image
        }
      }
    }
  }
`;

// GraphQL query for searching books on Google Books API
export const GET_GOOGLE_BOOKS = gql`
  query searchGoogleBooks($searchTerm: String!) {
    searchGoogleBooks(searchTerm: $searchTerm) {
      id
      volumeInfo {
        title
        authors
        description
        imageLinks {
          thumbnail
        }
      }
    }
  }
`;

// GraphQL mutation for saving a book to the database
export const SAVE_BOOK = gql`
  mutation saveBook($bookInput: BookInput!) {
    saveBook(bookInput: $bookInput) {
      bookId
      title
      authors
      description
      image
    }
  }
`;

// GraphQL query to get current user's saved books
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
      }
    }
  }
`;

// GraphQL mutation to delete a saved book
export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
      }
    }
  }
`;