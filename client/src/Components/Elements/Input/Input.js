import React from 'react';
import classes from './Input.module.css';

const Input = (props) => (
  <div className={`${classes.div} ${classes[props.className]}`}>
    <label className={classes.label} htmlFor={props.id}>{props.label}</label>
    <input className={classes.input} type={props.type} id={props.id} required={props.required} />
    {props.error ? <p className={classes.p}>{props.error}</p> : null}
  </div>
);
export default Input;