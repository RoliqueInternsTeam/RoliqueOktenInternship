import React from 'react';
import classes from './Input.module.css';

const Input = (props) => (
  <div className={`${classes.div} ${classes[props.className]}`}>
    <label className={classes.label} htmlFor={props.id}>{props.label}</label>
    <input
      className={classes.input}
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      pattern={props.pattern}
      required={props.required}
      onChange={props.onChange}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onKeyUp={props.onKeyUp}
      onBlur={props.onBlur}
    />
    {props.error ? <p className={classes.p}>{props.error}</p> : null}
  </div>
);
export default Input;
