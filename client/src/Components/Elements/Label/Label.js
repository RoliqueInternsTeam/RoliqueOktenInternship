import React from 'react';
import PropTypes from 'prop-types';
import classes from './Label.module.css';

const Label = (props) => (
  <label className={classes.label} htmlFor={props.htmlFor}>
    {props.label}
  </label>
);

Label.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.string.isRequired,
};
Label.defaultProps = {
  htmlFor: null,
};

export default Label;
