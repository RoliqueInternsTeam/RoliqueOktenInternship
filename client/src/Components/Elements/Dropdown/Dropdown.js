import React, { useState } from 'react';

import Select from 'react-dropdown-select';
import PropTypes from 'prop-types';
import './Dropdown.css';
import Label from '../Label/Label';
import ArrowUp from '../Icons/arrowup.svg';
import ArrowDown from '../Icons/arrowdown.svg';

const Dropdown = (props) => {
  const [style, setStyle] = useState(props.required ? {
    border: '1px solid #DA1414',
  } : {
    border: '1px solid #BFBFBF',
  });

  const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

  const customContentRenderer = ({ state }) => (
    state.values[0] ? (
      <div className='selected'>
        {capitalizeFirstLetter(state.values[0])}
      </div>
    ) : (
      <input
        tabIndex="-1"
        className="react-dropdown-select-input"
        size="9"
        placeholder="Select..."
        value=""
      />
    )
  );

  const customItemRenderer = ({ item, methods }) => (
    <div onClick={() => methods.addItem(item)} className='option'>
      {capitalizeFirstLetter(item)}
    </div>
  );

  const customDropdownHandleRenderer = ({ state }) => (
    state.dropdown
      ? <img alt='up' src={ArrowUp} className="arrowblack" />
      : <img alt='down' src={ArrowDown} className="arrowblack" />
  );

  return (
    <div className='div'>
      <Label label={props.label} />
      <Select
        name={props.name}
        required={props.required}
        itemRenderer={customItemRenderer}
        contentRenderer={customContentRenderer}
        dropdownHandleRenderer={customDropdownHandleRenderer}
        onChange={(values) => {
          setStyle({
            border: '1px solid #BFBFBF',
          });
          props.onChange(values[0]);
        }}
        values={props.value ? [props.value] : []}
        style={style}
        options={props.options}
      />
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Dropdown.defaultProps = {
  required: '',
  value: undefined,
};

export default Dropdown;
