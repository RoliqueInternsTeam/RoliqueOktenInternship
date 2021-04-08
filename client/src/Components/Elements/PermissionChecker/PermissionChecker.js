import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const PermissionChecker = (props) => {
  const role = useSelector(({ role }) => role);

  const authorized = props.permission.includes(role);
  console.log(authorized);
  console.log(props.display);
  return authorized ? props.children : props.display;
};

export default withRouter(PermissionChecker);
