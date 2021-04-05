import React, { useState } from 'react';
import classes from './Login.module.css';

import Input from '../Elements/Input/Input';
import Message from '../Elements/Message/Message';
import { INVALID_CREDENTIALS } from '../../config/messages';

const Login = (props) => {
  const [mismatch, setMismatch] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [event.target[0].id]: event.target[0].value,
        [event.target[1].id]: event.target[1].value,
      }),
    };

    const response = await fetch('http://localhost:5000/auth', request);

    if (response.status !== 200) {
      setMismatch(true);
    }

    if (response.status === 200) {
      props.history.push('/users');
    }
  };

  return (
    <form className={classes.loginForm} onSubmit={(event) => submitHandler(event)}>
      <h3 className={classes.h3}>Log into your account</h3>

      { mismatch ? <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} message={INVALID_CREDENTIALS} /> : null }

      <div className={classes.loginContainer}>
        { mismatch ? <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} message="Invalid email or password" /> : null }
        <Input className="loginInput" id="email" label="Email" type="email" required='required' />
        <Input className="loginInput" id="password" label="Password" type="password" required='required' />
      </div>
      <button type="submit" className={classes.button}>Log In</button>
    </form>
  );
};

export default Login;
