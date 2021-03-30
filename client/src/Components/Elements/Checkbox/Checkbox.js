import React from 'react';
import classes from './Checkbox.module.css';

const Checkbox = (props) => (
  <label className={classes.container}>
    {props.message}
    <input type="checkbox" />
    <span className={classes.checkmark} />
  </label>
);

export default Checkbox;
