import React from 'react';
import classes from './Dropdown.module.css';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
const { notRequiredSelect } = classes;
let selectClass = classes.select;
function clickEventHandle() {
  selectClass = classes.select1;
}

const Dropdown = (props) => (
  <div className={classes.div}>
    <label className={classes.label}>{props.label}</label>
    <select
      className={props.required ? selectClass : notRequiredSelect}
      name={props.name}
      required={props.required}
      onChange={props.onChange}
      onClick={() => clickEventHandle()}
    >
      <option className={classes.selected} selected disabled hidden>
        { props.select ? capitalizeFirstLetter(props.select) : 'Select...' }
      </option>
      {props.options.map((option, key) => <option className={classes.option} key={key}>{capitalizeFirstLetter(option)}</option>)}
    </select>
  </div>
);

export default Dropdown;
