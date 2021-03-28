import React from 'react';
import classes from './Dropdown.module.css';

const Dropdown = (props) => (
  <div className={classes.div}>
    <label className={classes.label}>{props.label}</label>
    <select className={classes.select} name={props.name}>
      {props.options.map((option, key) => <option className={classes.option} key={key}>{option}</option>)}
    </select>
  </div>
);

export default Dropdown;
