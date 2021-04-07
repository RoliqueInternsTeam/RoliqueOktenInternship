import { useSelector } from 'react-redux';

const PermissionChecker = (props) => {
  const role = useSelector(({ role }) => role);
  console.log(props.permission);
  const authorized = props.permission.includes(role);
  console.log(role, authorized);
  return authorized ? props.children : null;
};

export default PermissionChecker;
