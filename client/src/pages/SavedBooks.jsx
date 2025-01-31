import { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { GET_ME, DELETE_BOOK } from '../utils/mutations'; // Import the GraphQL query and mutation

const SavedBooks = () => {
  const [ setUserData] = useState({});
  
  const { data, loading, error } = useQuery(GET_ME);  // Fetch user data including saved books

  const [deleteBook] = useMutation(DELETE_BOOK);  // Mutation for deleting a saved book

  // handle deletion of a book
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook({
        variables: { bookId }
      });

      if (!response.data.deleteBook) {
        throw new Error('something went wrong!');
      }

      // After deletion, update local state to reflect changes
      const updatedUser = response.data.deleteBook;
      setUserData(updatedUser);

    } catch (err) {
      console.error(err);
    }
  };

  // If loading, display a loading message
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // If error occurs, display error message
  if (error) {
    return <h2>Error loading saved books</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data.me.savedBooks.length
            ? `Viewing ${data.me.savedBooks.length} saved ${data.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {data.me.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
