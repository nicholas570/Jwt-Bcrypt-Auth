import React, { useState } from 'react';
import firebase from '../../firebase/firebase';

import { Container, Form, Button } from 'react-bootstrap/';

import style from '../../css/Register.module.css';

function PhoneVerify() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const setReCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('verify', {
      size: 'invisible',
      callback: (response) => {
        onSignInSubmit();
      },
    });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    setReCaptcha();
    const appVerifier = window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(`+33${phoneNumber}`, appVerifier)
      .then((confirmationResult) => {
        const code = prompt('Enter validation code');
        confirmationResult
          .confirm(code)
          .then((result) => {
            setSuccess(true);
            console.log(result);
          })
          .catch((error) => {
            setError(error.code);
            setSuccess(false);
            setPhoneNumber('');
            window.location.reload();
          });
      })
      .catch((error) => {
        setError(error.code);
        setSuccess(false);
        setPhoneNumber('');
        window.location.reload();
      });
  };

  return (
    <Container className={style.container}>
      <Form.Group>
        <Form.Control
          size='lg'
          type='number'
          placeholder='Phone number'
          name='phoneNumber'
          onChange={handleChange}
          value={phoneNumber}
        />
      </Form.Group>
      <Button id='verify' variant='outline-primary' onClick={onSignInSubmit}>
        Verify
      </Button>
      {error && <p>{error}</p>}
    </Container>
  );
}

export default PhoneVerify;
