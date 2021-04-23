import React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import classes from './Input.module.css';

const mask = createNumberMask({
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  integerLimit: 9,
});

const Input = (props) => (
  <div className={`${classes.div} ${classes[props.className]}`}>
    <label className={classes.label} htmlFor={props.id}>{props.label}</label>
    { props.input ? props.input === 'masked'
      && (
      <MaskedInput
        {...props}
        className={classes.input}
        mask={mask}
        showMask={false}
        type='text'
        value={props.value}
      />
      ) : (
        <input
          className={classes.input}
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          value={props.value}
          pattern={props.pattern}
          required={props.required}
          onChange={props.onChange}
        />
    ) }
    {props.error ? <p className={classes.p}>{props.error}</p> : null}
  </div>
);

Input.propTypes = {
  className: PropTypes.string,
  input: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  input: '',
  error: '',
  label: null,
  type: null,
  id: null,
  placeholder: '',
  pattern: null,
  onChange: null,
};

export default Input;
