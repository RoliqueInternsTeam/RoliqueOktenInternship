import React from 'react';
import Avatar from 'react-avatar';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './TableRow.module.css';
import Tooltip from '../../Elements/Tooltip/Tooltip';
import Edit from '../../Elements/Icons/combined-shape.svg';
import { ADMIN, EMPLOYEE, MANAGER } from '../../../config/constants';
import PermissionChecker from '../PermissionChecker/PermissionChecker';

const TableRow = (props) => {
  const permissionHandler = () => {
    switch (props.role) {
      case ADMIN:
        return [ADMIN];
      case MANAGER:
        return [ADMIN, MANAGER];
      default:
        return [ADMIN, MANAGER, EMPLOYEE];
    }
  };

  return (
    <tr className={classes.tr}>
      <td>
        {props.avatar
          ? <img src={props.avatar} alt='avatar' className={classes.profilePicture} />
          : <Avatar name={props.column1 && props.column11 ? `${props.column1} ${props.column11}` : props.column2} size="32px" round style={{ marginRight: '12px' }} />}
        &nbsp;
        {props.column1}
        &nbsp;
        {props.column11}
      </td>
      <td>{props.column2}</td>
      <td>{props.column3}</td>
      <td>{props.column4}</td>
      <div className={classes.edit}>
        <PermissionChecker id={props.id} permission={permissionHandler()} display={null}>
          <NavLink
            to={props.to}
          >
            <div className={classes.tooltipDiv}>
              <Tooltip arrowPlace='right' align='center' color='dark' message={props.tooltipMessage} />
            </div>
            <img src={Edit} alt={props.imgAlt} />
          </NavLink>
        </PermissionChecker>
      </div>
    </tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  avatar: PropTypes.string,
  column1: PropTypes.string.isRequired,
  column11: PropTypes.string,
  column2: PropTypes.string.isRequired,
  column3: PropTypes.node.isRequired,
  column4: PropTypes.node,
  to: PropTypes.string.isRequired,
  tooltipMessage: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
};

TableRow.defaultProps = {
  role: '',
  avatar: '',
  column11: '',
  column4: '',
};

export default TableRow;
