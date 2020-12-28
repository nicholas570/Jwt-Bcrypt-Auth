import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import axiosInstance from '../../axios/axiosInstance';

import { Container, Row, Col, Form, Button } from 'react-bootstrap/';
import { ArrowLeft } from 'react-bootstrap-icons';

import { userContext } from '../../context/UserProvider';

import style from '../../css/Register.module.css';

function Register() {
  const [validated, setValidated] = useState(false);
  const [result, setResult] = useState({ message: '', error: '' });
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { setUserData } = useContext(userContext);
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

      axiosInstance(history)
        .post('api/auth/register', { ...state })
        .then(({ data }) => {
          console.log(data);
          setResult({ error: data.error, message: data.message });
          setUserData({
            user: data.data,
            token: data.token,
            refreshToken: data.refreshToken,
          });
          localStorage.setItem('Token', data.token);
          localStorage.setItem('User', JSON.stringify(data.data));
          history.push('/home');
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
      setValidated(false);
    }
  };
  return (
    <div className={style.container}>
      <Container>
        <Row className='d-flex justify-content-center'>
          <Col md={8}>
            <Link to='/'>
              <ArrowLeft />
            </Link>
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

              <Button variant='outline-primary' type='submit'>
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
    </div>
  );
}

export default Register;
