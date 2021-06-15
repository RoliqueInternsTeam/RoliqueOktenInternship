import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { ADMIN, EMPLOYEE, MANAGER } from '../../../config/constants';

const PermissionChecker = (props) => {
  const user = useSelector(({ user }) => user);

  let authorized = props.permission.includes(user.role);

  if (props.id && user.role === EMPLOYEE) {
    props.id === user._id ? authorized = true : authorized = false;
  }

  return authorized ? props.children : props.display;
};

PermissionChecker.propTypes = {
  permission: PropTypes.arrayOf(PropTypes.oneOf([ADMIN, MANAGER, EMPLOYEE])).isRequired,
  email: PropTypes.string,
  children: PropTypes.element.isRequired,
  display: PropTypes.oneOfType([PropTypes.node]),
};

export default withRouter(PermissionChecker);
