import React from 'react';
import './Input.css';

const Input = (props) => {
    return (
        <div className={props.className}>
            <label for={props.id}>{props.label}</label>
            <input type={props.type} id={props.id}/>
            {props.error ? <p>{props.error}</p> : null}
        </div>
    );
};

export default Input;