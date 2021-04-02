import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import classes from './CreateInternalUser.module.css';
import Info from '../Elements/Icons/info.svg';
import Input from '../Elements/Input/Input';
import Dropdown from '../Elements/Dropdown/Dropdown';
import Tooltip from '../Elements/Tooltip/Tooltip';
import PictureLoader from '../Elements/PictureLoader/PictureLoader';
import { ROLES_INFO } from '../../config/messages';
import Header from '../Elements/Header/Header';

const CreateInternalUser = (props) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    picture: null,
  });

  useEffect(() => { console.log(userInfo); }, [userInfo]);

  const inputHandler = (event) => {
    setUserInfo(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };
  const dropdownHandler = (event) => {
    setUserInfo(((prevState) => ({ ...prevState, role: event.target.value })));
  };
  const createHandler = async (event) => {
    event.preventDefault();
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    };

    const response = await fetch('http://localhost:5000/users', request);

    if (response.status === 201) {
      props.history.push('/users');
    }
  };

  return (
    <form className={classes.mainContainer} onSubmit={(event) => createHandler(event)}>
      <Header arrow title='Create Internal User' button='saveChanges' />
      <div className={classes.body}>
        <div className={classes.leftContainer}>
          <h4 className={classes.h4}>General</h4>
          <PictureLoader label="Profile Picture" alt="Add a profile picture" setState={setUserInfo} />
          <Input label="First Name" type='text' id="firstName" required="required" onChange={(event) => inputHandler(event)} />
          <Input label="Last Name" type='text' id="lastName" required="required" onChange={(event) => inputHandler(event)} />
          <Input label="Email" type='email' id="email" required="required" onChange={(event) => inputHandler(event)} />
          <Input label="Phone" type='tel' id="phone" onChange={(event) => inputHandler(event)} />
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.rolesInfo}>
            <h4 className={classes.h4}>Roles & Permissions</h4>
            <img src={Info} alt='info' className={classes.info} />
            <div className={classes.tooltipHider}>
              <Tooltip color='dark' arrowPlace='top' align='center' message={ROLES_INFO} />
            </div>
          </div>
          <Dropdown label="Role" name="roles" options={['Admin', 'Manager', 'Employee']} required="required" onChange={(event) => dropdownHandler(event)} />
          <div className={classes.passwordContainer}>
            <h4 className={classes.h4}>Password</h4>
            <Input label="Set Password" type='password' id="password" required="required" onChange={(event) => inputHandler(event)} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default withRouter(CreateInternalUser);
