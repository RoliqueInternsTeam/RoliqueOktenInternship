import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { ADMIN, EMPLOYEE, MANAGER } from '../../../config/constants';

const PermissionChecker = (props) => {
  const role = useSelector(({ role }) => role);
  const email = useSelector(({ email }) => email);

  let authorized = props.permission.includes(role);

  if (role === EMPLOYEE) {
    props.email === email ? authorized = true : authorized = false;
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
