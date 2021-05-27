import React from 'react';
import PropTypes from 'prop-types';
import classes from './List.module.css';

const List = (props) => (
  <div>
    <table className={classes.table}>
      <thead>
        <tr>
          {props.headers.map((header, index) => <th key={`${header}${index}`}><span className={classes.span}>{header}</span></th>)}
          <th aria-label="Edit" />
        </tr>
      </thead>
      <tbody>
        {props.map}
      </tbody>
    </table>
  </div>
);

List.propTypes = {
  // column1: PropTypes.array.isRequired,
  // column2: PropTypes.string.isRequired,
  // column3: PropTypes.string.isRequired,
  // column4: PropTypes.string.isRequired,
  map: PropTypes.node.isRequired,
};

export default List;
