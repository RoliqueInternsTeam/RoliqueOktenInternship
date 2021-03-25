import React from 'react';
import classes from './Toggle.module.css';

const Toggle = () => (
  <label className={classes.switch}>
    <input type="checkbox" />
    <span className={classes.slider} />
  </label>
);

export default Toggle;
