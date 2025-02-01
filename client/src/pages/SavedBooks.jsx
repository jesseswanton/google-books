import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const id = Auth.getProfile().data._id;
  console.log("User ID:", id);
  const user = Auth.getProfile().data.username;

  const { refetch, loading, data } = useQuery(GET_ME, {
    variables: { id: id },

  });
  console.log("Fetched Data:", data);
  

  // Empty array if savedBooks is undefined
  const userData = data?.me || {};
  const savedBooks = userData.savedBooks || [];

  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: { id, bookId },
      });
      refetch();
      removeBookId(bookId); // Remove book from localStorage
    } catch (err) {
      console.error(err);
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>{`Viewing ${user}'s saved books!`}</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {savedBooks.map((book) => (
            <Col key={book.bookId} md="4">
              <Card style={{ width: '18rem' }} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text
                    style={{
                      height: '9rem',
                      overflow: 'auto',
                      scrollBehavior: 'smooth',
                      scrollbarWidth: 'none',
                    }}
                  >
                    {book.description}
                  </Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
