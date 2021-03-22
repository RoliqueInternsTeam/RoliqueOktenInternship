import React from 'react';
import Input from "../Elements/Input/Input";
import './Login.css';
import Message from "../Elements/Message/Message";

function Login(props) {
    return (
        <div className='loginForm'>
            <h3>Log into your account</h3>
            <div className='loginContainer'>
            <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} message='Invalid email or password'/>
                <Input className='loginInput' id='email' label='Email' type='email'/>
                <Input className='loginInput' id='password' label='Password' type='password'/>
            </div>
            <button>Log In</button>
        </div>
    );
}

export default Login;