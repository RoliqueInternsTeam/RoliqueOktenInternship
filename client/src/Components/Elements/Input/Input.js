import React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import classes from './Input.module.css';
import { PHONE_NUMBER } from '../../../config/regexp.enum';
import Label from '../Label/Label';

const mask = createNumberMask({
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  integerLimit: 9,
});

const Input = (props) => (
  <div className={`${classes.div} ${classes[props.className]}`}>
    <Label label={props.label} htmlFor={props.id} />
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
  className: PropTypes.oneOf(['loginInput']),
  input: PropTypes.oneOf(['masked']),
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.oneOf([PHONE_NUMBER]),
  onChange: PropTypes.func,
  error: PropTypes.string,
};

Input.defaultProps = {
  className: null,
  input: null,
  error: null,
  label: null,
  type: null,
  id: null,
  placeholder: null,
  pattern: null,
  onChange: null,
};

export default Input;
