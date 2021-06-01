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
        <td key={index} className={classes[props.effort?.toLowerCase()]}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {Array.isArray(column) ? column.map((value) => {
            if (value === 'avatar') {
              return props.columns.avatar
                ? <img src={props.avatar} alt='avatar' className={classes.profilePicture} />
                : (
                  <Avatar
                    name={props.columns.name || props.columns.title}
                    size="32px"
                    round
                    style={{ marginRight: '12px' }}
                  />
                );
            }
            if (value === 'channels') {
              return <div className={classes.socialDiv}>{props.columns[value]}</div>;
            }
            return props.columns[value];
          })
            : ((column === 'status') ? (
              <div className={classes.statusColor} custom={props.columns[column]}>
                <div className={classes.dot} />
                {props.columns[column]}
              </div>
            ) : props.columns[column])}
        </td>
      ))}
      <div className={classes.rowBtn}>
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
//   to: PropTypes.string.isRequired,
//   tooltipMessage: PropTypes.string.isRequired,
//   imgAlt: PropTypes.string.isRequired,
// };
//
// TableRow.defaultProps = {
//   role: '',
//   avatar: '',
// };

export default TableRow;
