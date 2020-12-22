import React from 'react';
import RegisterForm from '../commons/RegisterForm';

import style from '../../css/Register.module.css';

function Register() {
  return (
    <div className={style.container}>
      <RegisterForm />
    </div>
  );
}

export default Register;
