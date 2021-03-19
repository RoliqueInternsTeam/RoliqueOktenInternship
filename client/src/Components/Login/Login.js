import React from 'react';
import './Login.css';

function Login(props) {
    return (
        <div className='loginForm'>
            <h3>Log into your account</h3>
            <div className='container'>
                <label>Email</label>
                <input type="email"/>
                <label>Password</label>
                <input type="password"/>
            </div>
            <button>Log In</button>
        </div>
    );
}

export default Login;