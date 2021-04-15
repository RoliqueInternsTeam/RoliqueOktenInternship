import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './TableRow.module.css';
import Tooltip from '../../Elements/Tooltip/Tooltip';
import Edit from '../../Elements/Icons/combined-shape.svg';
import { ADMIN, EMPLOYEE, MANAGER } from '../../../config/constants';
// import PermissionChecker from '../PermissionChecker/PermissionChecker';

const TableRow = (props) => {
  // eslint-disable-next-line no-unused-vars
  const permissionHandler = () => {
    switch (props.role) {
      default:
        return [ADMIN, MANAGER, EMPLOYEE];
      case ADMIN:
        return [ADMIN];
      case MANAGER:
        return [ADMIN];
      case EMPLOYEE:
        return [ADMIN, MANAGER];
    }
  };

  return (
    <tr className={classes.tr}>
      <td className={classes.td}>
        {props.avatar
          ? <img src={`http://localhost:5000/${props.avatar}`} alt='avatar' className={classes.profilePicture} /> : ''}
        &nbsp;
        {props.column1}
        &nbsp;
        {props.column11}
      </td>
      <td>{props.column2}</td>
      <td>{props.column3}</td>
      <td>{props.column4}</td>
      <td className={classes.edit}>
        {/* <PermissionChecker permission={permissionHandler()} display={null}> */}
        <NavLink
          to={props.to}
          onClick={props.onClick}
        >
          <div className={classes.tooltipDiv}>
            <Tooltip arrowPlace='right' align='center' color='dark' message={props.tooltipMessage} />
          </div>
          <img src={Edit} alt={props.imgAlt} />
        </NavLink>
        {/* </PermissionChecker> */}
      </td>
    </tr>
  );
};

export default TableRow;
