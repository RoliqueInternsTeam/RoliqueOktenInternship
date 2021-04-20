import React from 'react';
import PropTypes from 'prop-types';
import classes from './Dropdown.module.css';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
const { notRequiredSelect, select } = classes;

const Dropdown = (props) => (
  <div className={classes.div}>
    <label className={classes.label}>{props.label}</label>
    <select
      className={props.required ? select : notRequiredSelect}
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

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  select: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Dropdown.defaultProps = {
  select: '',
};

export default Dropdown;
