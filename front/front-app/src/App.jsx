import { useState } from 'react';
import axios from 'axios';

import { Container, Row, Col, Form, Button } from 'react-bootstrap/';

import './App.css';

function App() {
  const [validated, setValidated] = useState(false);
  const [result, setResult] = useState();
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
      axios
        .post('http://localhost:5001/api/auth/register', { ...state })
        .then(({ data }) => {
          console.log(data);
          setResult(data.message);
        })
        .catch((err) => {
          setResult(err.response.data.message);
        });

      setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    }
    setValidated(true);
  };

  return (
    <div className='App'>
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
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Register
              </Button>
            </Form>
            <p>{result && result}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
