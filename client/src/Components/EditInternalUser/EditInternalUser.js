import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { serialize } from 'object-to-formdata';
import classes from './EditInternalUser.module.css';
import Info from '../Elements/Icons/info.svg';
import Input from '../Elements/Input/Input';
import Dropdown from '../Elements/Dropdown/Dropdown';
import Tooltip from '../Elements/Tooltip/Tooltip';
import PictureLoader from '../Common/PictureLoader/PictureLoader';
import { RESTRICTED_ACCESS, ROLES_INFO } from '../../config/messages';
import { PHONE_NUMBER } from '../../config/regexp.enum';
import PermissionChecker from '../Common/PermissionChecker/PermissionChecker';
import { ADMIN, EMPLOYEE, MANAGER } from '../../config/constants';
import Message from '../Elements/Message/Message';
import Header from '../Common/Header/Header';
import { Edit, getOne } from '../../helpers/ApiService';
import { setUser } from '../../store/actions';

const EditInternalUser = (props) => {
  const user = useSelector(({ user }) => user);
  const [userInfo, setUserInfo] = useState({ ...user, password: '' });
  const access_token = useSelector(({ access_token }) => access_token);
  const role = useSelector(({ role }) => role);
  const dispatch = useDispatch();

  const fetchHandler = () => {
    const path = props.history.location.pathname.split('/');
    const id = path[3];
    getOne(`http://localhost:5000/user/${id}`, access_token)
      .then((res) => dispatch(setUser(res)));
  };

  useEffect(() => fetchHandler(), []);

  useEffect(() => setUserInfo(((prevState) => ({ ...prevState, ...user }))), [user]);

  const creatingAccessHandler = (role) => {
    switch (role) {
      default:
        return [EMPLOYEE];
      case ADMIN:
        return [ADMIN, MANAGER, EMPLOYEE];
      case MANAGER:
        return [MANAGER, EMPLOYEE];
    }
  };
  const inputHandler = (event) => {
    setUserInfo(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };
  const dropdownHandler = (event) => {
    setUserInfo(((prevState) => ({ ...prevState, role: event.target.value.toLowerCase() })));
  };
  const createHandler = async (event) => {
    event.preventDefault();

    const formData = serialize(
      userInfo,
    );

    const status = await Edit(`http://localhost:5000/user/${userInfo._id}`, formData, access_token, dispatch);
    status === 200 ? props.history.push('/users') : null;
  };

  return (
    <PermissionChecker
      permission={[ADMIN, MANAGER, EMPLOYEE]}
      display={<Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={RESTRICTED_ACCESS} redirect />}
    >
      <form className={classes.mainContainer} onSubmit={(event) => createHandler(event)}>
        <Header arrow title='Edit Internal User' button='saveChanges' />
        <div className={classes.body}>
          <div className={classes.leftContainer}>
            <h4 className={classes.h4}>General</h4>
            <PictureLoader label='Profile Picture' alt='Add an avatar' avatar={userInfo.avatar} setState={setUserInfo} />
            <Input label="First Name" type='text' id="firstName" value={userInfo.firstName} onChange={(event) => inputHandler(event)} />
            <Input label="Last Name" type='text' id="lastName" value={userInfo.lastName} onChange={(event) => inputHandler(event)} />
            <Input label="Email" type='email' id="email" value={userInfo.email} onChange={(event) => inputHandler(event)} />
            <Input label="Phone" type='tel' id="phone" pattern={PHONE_NUMBER} value={userInfo.phone} onChange={(event) => inputHandler(event)} />
          </div>
          <div className={classes.rightContainer}>
            <div className={classes.rolesInfo}>
              <h4 className={classes.h4}>Roles & Permissions</h4>
              <img src={Info} alt='info' className={classes.info} />
              <div className={classes.tooltipHider}>
                <Tooltip color='dark' arrowPlace='top' align='center' message={ROLES_INFO} />
              </div>
            </div>
            <Dropdown
              label="Role"
              name="roles"
              options={creatingAccessHandler(role)}
              select={userInfo.role}
              onChange={(event) => dropdownHandler(event)}
            />
            <div className={classes.passwordContainer}>
              <h4 className={classes.h4}>Password</h4>
              <Input label="Set Password" type='password' id="password" onChange={(event) => inputHandler(event)} />
            </div>
          </div>
        </div>
      </form>
    </PermissionChecker>
  );
};

export default withRouter(EditInternalUser);
