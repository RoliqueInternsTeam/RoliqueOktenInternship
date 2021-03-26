import React from 'react';
import Input from '../Elements/Input/Input';
import classes from './Login.module.css';
// import Message from '../Elements/Message/Message';

const Login = () => (
  <form className={classes.loginForm}>
    <h3 className={classes.h3}>Log into your account</h3>
    {/* <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} message={props.message} /> */}
    <div className={classes.loginContainer}>
      <Input className="loginInput" id="email" label="Email" type="email" required='required' />
      <Input className="loginInput" id="password" label="Password" type="password" required='required' />
    </div>
    <button type="submit" className={classes.button}>Log In</button>
  </form>
);

export default Login;
