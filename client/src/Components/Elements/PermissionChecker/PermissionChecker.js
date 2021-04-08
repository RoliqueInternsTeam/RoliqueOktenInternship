import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const PermissionChecker = (props) => {
  const role = useSelector(({ role }) => role);
  console.log(role);

  const authorized = props.permission.includes(role);
  console.log(authorized);
  return authorized ? props.children : props.display;
};

export default withRouter(PermissionChecker);
