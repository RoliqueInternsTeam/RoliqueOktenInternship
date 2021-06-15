import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import Cookies from 'universal-cookie';
import axios from 'axios';
import classes from './Login.module.css';

import Input from '../Elements/Input/Input';
import Message from '../Elements/Message/Message';
import { INVALID_CREDENTIALS } from '../../config/messages';
import { setToken, login } from '../../store/actions';

const Login = (props) => {
  const [mismatch, setMismatch] = useState(null);

  const cookies = new Cookies();

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth', {
        [event.target[0].id]: event.target[0].value,
        [event.target[1].id]: event.target[1].value,
      });

      if (response.status === 200) {
        const { access_token, refresh_token, user } = await response.data;
        cookies.set('refresh_token', refresh_token);
        dispatch(login(user));
        dispatch(setToken(access_token));
        props.history.push('/users');
      }
    } catch (e) {
      setMismatch(true);
    }
  };

  return (
    <form className={classes.loginForm} onSubmit={(event) => submitHandler(event)}>
      <h3 className={classes.h3}>
        Log into your account
      </h3>
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
