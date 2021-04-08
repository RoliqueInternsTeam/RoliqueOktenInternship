import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CreateInternalUser.module.css';
import Info from '../Elements/Icons/info.svg';
import Input from '../Elements/Input/Input';
import Dropdown from '../Elements/Dropdown/Dropdown';
import Tooltip from '../Elements/Tooltip/Tooltip';
import PictureLoader from '../Elements/PictureLoader/PictureLoader';
import { RESTRICTED_ACCESS, ROLES_INFO } from '../../config/messages';
import { PHONE_NUMBER } from '../../config/regexp.enum';
import { ADMIN, MANAGER } from '../../config/constants';
import Header from '../Elements/Header/Header';
import PermissionChecker from '../Elements/PermissionChecker/PermissionChecker';
import RefreshToken from '../../helpers';
import Toastr from '../Elements/Toastr/Toastr';
import { setBadRequest } from '../../store/actions';

const CreateInternalUser = (props) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    avatar: null,
  });

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
        return ['employee'];
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
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        AUTHORIZATION: access_token,
      },
      body: JSON.stringify(userInfo),
    };

    const response = await fetch('http://localhost:5000/user', request);
    if (response.status === 201) {
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
    <PermissionChecker permission={[ADMIN, MANAGER]} display={<Toastr message={RESTRICTED_ACCESS} redirect />}>
      <form className={classes.mainContainer} onSubmit={(event) => createHandler(event)}>
        <Header arrow title='Create Internal User' button='saveChanges' />
        <div className={classes.body}>
          <div className={classes.leftContainer}>
            <h4 className={classes.h4}>General</h4>
            <PictureLoader label='Profile Picture' alt='Add an avatar' setState={setUserInfo} />
            <Input label="First Name" type='text' id="firstName" required="required" onChange={(event) => inputHandler(event)} />
            <Input label="Last Name" type='text' id="lastName" required="required" onChange={(event) => inputHandler(event)} />
            <Input label="Email" type='email' id="email" required="required" onChange={(event) => inputHandler(event)} />
            <Input label="Phone" type='tel' id="phone" pattern={PHONE_NUMBER} onChange={(event) => inputHandler(event)} />
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
              required="required"
              onChange={(event) => dropdownHandler(event)}
            />
            <div className={classes.passwordContainer}>
              <h4 className={classes.h4}>Password</h4>
              <Input label="Set Password" type='password' id="password" required="required" onChange={(event) => inputHandler(event)} />
            </div>
          </div>
        </div>
      </form>
    </PermissionChecker>
  );
};

export default withRouter(CreateInternalUser);
