import React from 'react';
import Input from '../Elements/Input/Input';
import classes from './Login.module.css';
import Message from '../Elements/Message/Message';

function Login() {
  return (
    <div className={classes.loginForm}>
      <h3 className={classes.h3}>Log into your account</h3>
      <div className={classes.loginContainer}>
        <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} message="Invalid email or password" />
        <Input className="loginInput" id="email" label="Email" type="email" />
        <Input className="loginInput" id="password" label="Password" type="password" />
      </div>
      <button className={classes.button}>Log In</button>
    </div>
  );
}

export default Login;
