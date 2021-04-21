import React from 'react';
import classes from './Label.module.css';

const Label = (props) => (
  <label className={classes.label} htmlFor={props.htmlFor}>
    {props.label}
  </label>
);

export default Label;
