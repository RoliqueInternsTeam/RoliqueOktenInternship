import React from 'react';
import classes from './List.module.css';

const List = (props) => (
  <div>
    <table className={classes.table}>
      <thead>
        <tr>
          <th className={classes.th}><span className={classes.span}>{props.column1}</span></th>
          <th><span className={classes.span}>{props.column2}</span></th>
          <th><span className={classes.span}>{props.column3}</span></th>
          <th className={classes.last}><span className={classes.span}>{props.column4}</span></th>
        </tr>
      </thead>
      <tbody>
        {props.map}
      </tbody>
    </table>

  </div>
);
export default List;
