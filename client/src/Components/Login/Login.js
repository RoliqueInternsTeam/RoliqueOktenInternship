import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import classes from './Login.module.css';

import Input from '../Elements/Input/Input';
import Message from '../Elements/Message/Message';
import { INVALID_CREDENTIALS } from '../../config/messages';
import { LOGIN, TOKEN } from '../../store/actions';

const login = () => ({ type: LOGIN });
const setToken = (payload) => ({ type: TOKEN, payload });

const Login = (props) => {
  const [mismatch, setMismatch] = useState(null);

  const dispatch = useDispatch();

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
    const { access_token } = await response.json();

    if (response.status !== 200) {
      setMismatch(true);
    }

    if (response.status === 200) {
      dispatch(setToken(access_token));
      dispatch(login());
      props.history.push('/users');
    }
  };

  return (
    <form className={classes.loginForm} onSubmit={(event) => submitHandler(event)}>
      <h3 className={classes.h3}>Log into your account</h3>
      <div className={classes.loginContainer}>
        { mismatch ? <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} message={INVALID_CREDENTIALS} /> : null }
        <Input className="loginInput" id="email" label="Email" type="email" required='required' />
        <Input className="loginInput" id="password" label="Password" type="password" required='required' />
      </div>
      <button type="submit" className={classes.button}>Log In</button>
    </form>
  );
};

export default withRouter(Login);
