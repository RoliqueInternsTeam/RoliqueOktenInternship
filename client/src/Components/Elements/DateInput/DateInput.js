import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import classes from './DateInput.module.scss';
import './DateCalendar.css';
import Label from '../Label/Label';

const DateInput = (props) => (
  <div className={classes[props.input]}>
    <Label label={props.label} />
    <DatePicker
      onChange={(date) => props.setState(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      dateFormat="dd.MM.yyyy"
      selected={props.selected}
      calendarClassName={classes[props.calendar]}
    />
  </div>
);

DateInput.propTypes = {
  input: PropTypes.oneOf(['longInput', 'shortInput']).isRequired,
  calendar: PropTypes.oneOf(['longCalendar', 'shortCalendar']).isRequired,
  label: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Date),
};

DateInput.defaultProps = {
  selected: null,
};

export default DateInput;
