import React from 'react';
import Avatar from 'react-avatar';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import classes from './TableRow.module.css';
import Tooltip from '../../Elements/Tooltip/Tooltip';
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
      {props.columnsOrder.map((column, index) => (
        <td key={index}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {Array.isArray(column) ? column.map((value) => (value === 'avatar' ? (props.columns.avatar
            ? <img src={props.avatar} alt='avatar' className={classes.profilePicture} />
            : <Avatar name={props.columns.name} size="32px" round style={{ marginRight: '12px' }} />)
            : props.columns[value]))
            : props.columns[column]}
        </td>
      ))}
      <div className={classes.edit}>
        <PermissionChecker id={props.id} permission={permissionHandler()} display={null}>
          <NavLink
            to={props.to}
          >
            <div className={classes.tooltipDiv}>
              <Tooltip arrowPlace='right' align='center' color='dark' message={props.tooltipMessage} />
            </div>
            <img src={props.rowBtn} alt={props.imgAlt} />
          </NavLink>
        </PermissionChecker>
      </div>
    </tr>
  );
};

// TableRow.propTypes = {
//   id: PropTypes.string.isRequired,
//   role: PropTypes.string,
//   avatar: PropTypes.string,
//   column1: PropTypes.string.isRequired,
//   column11: PropTypes.string,
// column2: PropTypes.string.isRequired,
// column3: PropTypes.node.isRequired,
// column4: PropTypes.node,
//   to: PropTypes.string.isRequired,
//   tooltipMessage: PropTypes.string.isRequired,
//   imgAlt: PropTypes.string.isRequired,
// };

// TableRow.defaultProps = {
//   role: '',
//   avatar: '',
//   column11: '',
//   column4: '',
// };

export default TableRow;
