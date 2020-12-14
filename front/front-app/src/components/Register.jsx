import { useState } from 'react';
import axios from 'axios';

import { Container, Row, Col, Form, Button } from 'react-bootstrap/';

function Register() {
  const [validated, setValidated] = useState(false);
  const [result, setResult] = useState({ message: '', error: '' });
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setValidated(true);

      axios
        .post('http://localhost:5001/api/auth/register', { ...state })
        .then(({ data }) => {
          console.log(data);
          setResult({ ...result, message: data.message });
        })
        .catch((err) => {
          if (err.response === undefined) {
            setResult({
              message: 'Something went wrong',
              error: '',
            });
          } else {
            setResult({
              message: err.response.data.message,
              error: err.response.data.error,
            });
          }
        });

      setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                name='firstName'
                onChange={handleChange}
                value={state.firstName}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                name='lastName'
                onChange={handleChange}
                value={state.lastName}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                onChange={handleChange}
                value={state.email}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='5 caractères mininum dont 1 chiffre'
                name='password'
                onChange={handleChange}
                value={state.password}
                required
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Register
            </Button>
          </Form>
          {result && (
            <>
              <p>{result.message}</p>
              <p>{result.error}</p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
