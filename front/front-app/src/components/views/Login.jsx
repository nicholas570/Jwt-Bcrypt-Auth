import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { userContext } from '../../context/UserProvider';
import { authContext } from '../../context/AuthProvider';

import { Container, Row, Col, Form, Button } from 'react-bootstrap/';
import { ArrowLeft } from 'react-bootstrap-icons';

import style from '../../css/Register.module.css';

function Login() {
  const [state, setState] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [result, setResult] = useState({ message: '', error: '' });
  const { setUserData } = useContext(userContext);
  const { login, setToken } = useContext(authContext);
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setValidated(true);

      await login(history, state, setToken, setResult, setUserData);

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
          <Link to='/'>
            <ArrowLeft />
          </Link>
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
