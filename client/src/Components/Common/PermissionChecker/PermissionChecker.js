import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { EMPLOYEE } from '../../../config/constants';

const PermissionChecker = (props) => {
  const role = useSelector(({ role }) => role);
  const email = useSelector(({ email }) => email);

  let authorized = props.permission.includes(role);

  if (role === EMPLOYEE) {
    props.email === email ? authorized = true : authorized = false;
  }

  return authorized ? props.children : props.display;
};

export default withRouter(PermissionChecker);
