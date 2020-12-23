import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Container, Row, Col, Form, Button } from 'react-bootstrap/';

import style from '../../css/Register.module.css';

function Login() {
  const [state, setState] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [result, setResult] = useState({ message: '', error: '' });
  const history = useHistory();

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
        .post('http://localhost:5001/api/auth/login', { ...state })
        .then(({ data }) => {
          console.log(data);
          setResult({ error: data.error, message: data.message });
          localStorage.setItem('Token', data.token);
          localStorage.setItem('RefreshToken', data.refreshToken);
          setTimeout(() => {
            history.push('/home');
          });
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
        email: '',
        password: '',
      });
      setValidated(false);
    }
  };

  return (
    <Container fluid className={style.container}>
      <Row className='m-3'>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Email'
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
                placeholder='Password'
                name='password'
                onChange={handleChange}
                value={state.password}
                required
              />
            </Form.Group>

            <Button variant='outline-primary' type='submit'>
              Login
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

export default Login;
