import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import classes from './BirthdateInput.module.css';

const BirthdateInput = (props) => (
  <div className={classes.div}>
    <label className={classes.label}>{props.label}</label>
    <DatePicker
      onChange={(date) => props.setState(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      dateFormat="dd.MM.yyyy"
      selected={props.state.birthday}
    />
  </div>
);

export default BirthdateInput;
