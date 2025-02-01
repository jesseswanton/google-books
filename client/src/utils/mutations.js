import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        _id
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Don't think this is necessary
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

export const SAVE_BOOK = gql`
  mutation Mutation($id: ID, $criteria: BookInput) {
    saveBook(_id: $id, criteria: $criteria) {
      _id
      savedBooks {
        bookId
      }
    }
  }
`;

// GraphQL query to get current user's saved books
// export const GET_ME = gql`
//   query me($id: ID) {
//     me(_id: $id) {
//       _id
//       username
//       email
//       savedBooks {
//         title
//         authors
//         bookId
//         description
//         image
//         link
//       }
//     }
//   }
// `;

export const REMOVE_BOOK = gql`
  mutation Mutation($id:ID, $bookId: String!) {
    removeBook(bookId: $bookId, _id: $id) {
      _id
      savedBooks {
        bookId
      }
    }
  }
`;