import React from 'react';

// import PropTypes from 'prop-types';
import Select from 'react-dropdown-select';
import './Dropdown.css';
import Label from '../Label/Label';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
// const { notRequiredSelect } = classes;
// let selectClass = classes.select;
// function clickEventHandle() {
//   selectClass = notRequiredSelect;
// }
// const Dropdown = (props) => (
//   <div className={classes.div}>
//     <Label label={props.label} />
//     <select
//       className={props.required ? selectClass : notRequiredSelect}
//       name={props.name}
//       required={props.required}
//       onChange={props.onChange}
//       onClick={clickEventHandle}
//     >
//       <option className={classes.selected} selected disabled hidden>
//         { props.select ? capitalizeFirstLetter(props.select) : 'Select...' }
//       </option>
//       {props.options.map((option, key) => <option className={classes.option} key={key}>{capitalizeFirstLetter(option)}</option>)}
//     </select>
//   </div>
// );
const Dropdown = (props) => {
  let style = {
    background: '#DA1414',
    border: '1px solid #DA1414',
  };

  const customContentRenderer = ({ state }) => {
    if (state.values[0]) {
      style = {
        background: '#BFBFBF',
        border: '1px solid #BFBFBF',
      };
      return (
        <div className='selected'>
          {capitalizeFirstLetter(state.values[0])}
        </div>
      );
    }
    return (
      <input
        tabIndex="-1"
        className="react-dropdown-select-input"
        size="9"
        placeholder="Select..."
        value=""
      />
    );
  };

  const customItemRenderer = ({ item, methods }) => (
    <div onClick={() => methods.addItem(item)} className='option'>
      {capitalizeFirstLetter(item)}
    </div>
  );

  return (
    <div className='div'>
      <Label label={props.label} />
      <Select
        name={props.name}
        required={props.required}
        itemRenderer={customItemRenderer}
        contentRenderer={customContentRenderer}
        onChange={() => undefined}
        values={[]}
        style={style}
        options={props.options}
      />
    </div>
  );
};

//
// Dropdown.propTypes = {
//   label: PropTypes.string.isRequired,
//   required: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   select: PropTypes.string,
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
// };
//
// Dropdown.defaultProps = {
//   required: '',
//   select: '',
// };

export default Dropdown;
