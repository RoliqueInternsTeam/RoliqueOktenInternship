import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './SingleUser.module.css';
import Edit from '../../../Elements/Icons/combined-shape.svg';
import Tooltip from '../../../Elements/Tooltip/Tooltip';

const SingleUser = (props) => (
  <tr className={classes.tr}>
    <td className={classes.td}>
      {props.firstName}
      {props.lastName}
    </td>
    <td>{props.email}</td>
    <td>{props.role}</td>
    <td>{props.phone}</td>
    <NavLink className={classes.edit} to="/edit">
      <div className={classes.tooltipDiv}>
        <Tooltip arrowPlace='right' align='center' color='dark' message='Edit User' />
      </div>
      <img src={Edit} alt="Edit User" />
    </NavLink>
  </tr>
);

export default SingleUser;
