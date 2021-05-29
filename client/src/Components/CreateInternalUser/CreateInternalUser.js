import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { serialize } from 'object-to-formdata';
import classes from './CreateInternalUser.module.css';
import Info from '../Elements/Icons/info.svg';
import Input from '../Elements/Input/Input';
import Dropdown from '../Elements/Dropdown/Dropdown';
import Tooltip from '../Elements/Tooltip/Tooltip';
import PictureLoader from '../Common/PictureLoader/PictureLoader';
import { RESTRICTED_ACCESS, ROLES_INFO } from '../../config/messages';
import { PHONE_NUMBER } from '../../config/regexp.enum';
import { ADMIN, EMPLOYEE, MANAGER } from '../../config/constants';
import Header from '../Common/Header/Header';
import PermissionChecker from '../Common/PermissionChecker/PermissionChecker';
import Message from '../Elements/Message/Message';
import { Create } from '../../helpers/ApiService';

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
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const creatingAccessHandler = (role) => {
    switch (role) {
      default:
        return null;
      case ADMIN:
        return [ADMIN, MANAGER, EMPLOYEE];
      case MANAGER:
        return [MANAGER, EMPLOYEE];
    }
  };

  const inputHandler = (event) => {
    setUserInfo(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };
  const dropdownHandler = (value) => {
    setUserInfo(((prevState) => ({ ...prevState, role: value.toLowerCase() })));
  };
  const createHandler = async (event) => {
    event.preventDefault();

    const formData = serialize(
      userInfo,
    );

    const status = await Create('http://localhost:5000/user', formData, access_token, dispatch);
    status === 201 ? props.history.push('/users') : null;
  };

  return (
    <PermissionChecker
      permission={[ADMIN, MANAGER]}
      display={<Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={RESTRICTED_ACCESS} redirect />}
    >
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
              options={creatingAccessHandler(user.role)}
              required="required"
              onChange={(value) => dropdownHandler(value)}
            />
            <div>
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
