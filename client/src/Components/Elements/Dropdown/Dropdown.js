import React from 'react';
import classes from './Dropdown.module.css';

const Dropdown = (props) => (
  <div className={classes.div}>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label className={classes.label}>{props.label}</label>
    <select className={classes.select} name={props.name}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {props.options.map((option, key) => <option className={classes.option} key={key}>{option}</option>)}
    </select>
  </div>
);

export default Dropdown;
