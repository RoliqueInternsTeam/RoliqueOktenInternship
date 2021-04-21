import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import classes from './BirthdateInput.module.scss';
import './BirthdateCalendar.css';
import Label from '../Label/Label';

const BirthdateInput = (props) => (
  <div className={classes.div}>
    <Label label={props.label} />
    <DatePicker
      onChange={(date) => props.setState(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      dateFormat="dd.MM.yyyy"
      selected={props.state.birthday}
      calendarClassName={classes.calendar}
    />
  </div>
);

export default BirthdateInput;
