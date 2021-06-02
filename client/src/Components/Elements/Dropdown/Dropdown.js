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
  const [required, setRequired] = useState(!!props.required);
  const [selected, setSelected] = useState(null);

  const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

  const customContentRenderer = ({ state }) => (
    state.values[0] ? (
      <div className='selected'>
        {typeof state.values[0] === 'string' ? capitalizeFirstLetter(state.values[0]) : state.values[0]}
      </div>
    ) : (
      <input
        tabIndex="-1"
        className="react-dropdown-select-input"
        size="9"
        placeholder="Select..."
        defaultValue=""
      />
    )
  );

  const customItemRenderer = ({ item, methods }) => (
    <div onClick={() => methods.addItem(item)} className='option'>
      {typeof item === 'string' ? capitalizeFirstLetter(item) : item}
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
        required={required}
        clearable={selected ? props.clearable : null}
        itemRenderer={customItemRenderer}
        contentRenderer={customContentRenderer}
        dropdownHandleRenderer={customDropdownHandleRenderer}
        onChange={(values) => {
          setStyle({
            border: '1px solid #BFBFBF',
          });
          setRequired(false);
          setSelected(values[0]);
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
  // options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Dropdown.defaultProps = {
  required: '',
  value: undefined,
};

export default Dropdown;
