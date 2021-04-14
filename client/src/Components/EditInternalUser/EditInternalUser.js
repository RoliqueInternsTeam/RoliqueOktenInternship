import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import classes from './EditInternalUser.module.css';
import Arrow from '../Elements/Icons/arrow.svg';
import Info from '../Elements/Icons/info.svg';
import Input from '../Elements/Input/Input';
import Dropdown from '../Elements/Dropdown/Dropdown';
import Tooltip from '../Elements/Tooltip/Tooltip';
import PictureLoader from '../Common/PictureLoader/PictureLoader';
import { RESTRICTED_ACCESS, ROLES_INFO } from '../../config/messages';
import { PHONE_NUMBER } from '../../config/regexp.enum';
import PermissionChecker from '../Common/PermissionChecker/PermissionChecker';
import { ADMIN, MANAGER } from '../../config/constants';
import RefreshToken from '../../helpers';
import { setBadRequest } from '../../store/actions';
import Message from '../Elements/Message/Message';

const EditInternalUser = (props) => {
  const user = useSelector(({ user }) => user);
  const [userInfo, setUserInfo] = useState({ ...user, password: '' });
  const access_token = useSelector(({ access_token }) => access_token);
  const role = useSelector(({ role }) => role);
  const dispatch = useDispatch();

  const creatingAccessHandler = (role) => {
    switch (role) {
      default:
        return null;
      case ADMIN:
        return ['admin', 'manager', 'employee'];
      case MANAGER:
        return ['manager', 'employee'];
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
    const formData = new FormData();
    Object.keys(userInfo).forEach((key) => formData.append(key, userInfo[key]));

    const request = {
      method: 'PUT',
      headers: {
        AUTHORIZATION: access_token,
      },
      body: formData,
    };

    const response = await fetch(`http://localhost:5000/user/${userInfo._id}`, request);

    if (response.status === 200) {
      props.history.push('/users');
    }
    if (response.status === 401) {
      await RefreshToken();
      await createHandler();
    }
    if (response.status !== 401 && response.status !== 201) {
      dispatch(setBadRequest(true));
      setTimeout(() => dispatch(setBadRequest(false)), 3000);
    }
  };

  return (
    <PermissionChecker
      permission={[ADMIN, MANAGER]}
      display={<Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={RESTRICTED_ACCESS} redirect />}
    >
      <form className={classes.mainContainer} onSubmit={(event) => createHandler(event)}>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <img src={Arrow} alt='Arrow button' className={classes.arrow} onClick={() => props.history.goBack()} />
            <h1>Edit Internal User</h1>
          </div>
          <button type='submit' className={classes.button}>Save changes</button>
        </div>
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
