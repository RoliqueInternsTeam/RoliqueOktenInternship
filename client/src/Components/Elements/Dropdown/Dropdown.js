import React from 'react';
import classes from './Dropdown.module.css';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

const Dropdown = (props) => (
  <div className={classes.div}>
    <label className={classes.label}>{props.label}</label>
    <select
      className={classes.select}
      name={props.name}
      required={props.required}
      onChange={props.onChange}
    >
      <option className={classes.selected} selected disabled hidden>
        { props.select ? capitalizeFirstLetter(props.select) : 'Select...' }
      </option>
      {props.options.map((option, key) => <option className={classes.option} key={key}>{capitalizeFirstLetter(option)}</option>)}
    </select>
  </div>
);

export default Dropdown;
