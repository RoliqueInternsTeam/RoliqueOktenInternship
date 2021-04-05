import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './SingleUser.module.css';
import Edit from '../../../Elements/Icons/combined-shape.svg';
import Tooltip from '../../../Elements/Tooltip/Tooltip';
import SearchContext from '../../../../context/searchContext';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

const SingleUser = (props) => (
  <tr className={classes.tr}>
    <td className={classes.td}>
      {props.firstName || props.firstname}
      &nbsp;
      {props.lastName || props.lastname}
    </td>
    <td>{props.email}</td>
    <td>{capitalizeFirstLetter(props.role)}</td>
    <td>{props.phone}</td>
    <td className={classes.edit}>
      <NavLink
        to="/edit"
        onClick={() => {
          // eslint-disable-next-line no-underscore-dangle
          SearchContext.editUser = { ...props };
        }}
      >
        <div className={classes.tooltipDiv}>
          <Tooltip arrowPlace='right' align='center' color='dark' message='Edit User' />
        </div>
        <img src={Edit} alt="Edit User" />
      </NavLink>
    </td>
  </tr>
);
export default SingleUser;
