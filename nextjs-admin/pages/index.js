import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';


const Home = () => {
  return (
    <Container style={{ marginTop: '150px' }}>
      <Alert >
      Welcome to dashboard for Management.{'  '}
        <Link href="/auth/login">Please login to continue to dashboard</Link>
      </Alert>
    </Container>
  );
};
export default Home;

