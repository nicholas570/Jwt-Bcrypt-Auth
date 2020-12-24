import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap/';

import style from '../../css/Register.module.css';

function Auth() {
  return (
    <Container fluid className={style.container}>
      <Row className='m-3'>
        <Col>
          <Link to='/register'>
            <Button variant='outline-primary' size='lg'>
              Sign up
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className='m-3'>
        <Col>
          <Link to='/login'>
            <Button variant='outline-primary' size='lg'>
              Login
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Auth;
