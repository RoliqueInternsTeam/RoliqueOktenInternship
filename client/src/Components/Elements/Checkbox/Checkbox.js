import React from 'react';
import PropTypes from 'prop-types';
import classes from './Checkbox.module.css';

const Checkbox = (props) => (
  <label className={classes.container}>
    {props.message}
    <input type="checkbox" />
    <span className={classes.checkmark} />
  </label>
);

Checkbox.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Checkbox;
