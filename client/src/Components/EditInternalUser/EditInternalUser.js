import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import classes from './EditInternalUser.module.css';
import Arrow from '../Elements/Icons/arrow.svg';
import Info from '../Elements/Icons/info.svg';
import Input from '../Elements/Input/Input';
import Dropdown from '../Elements/Dropdown/Dropdown';
import Tooltip from '../Elements/Tooltip/Tooltip';
import PictureLoader from '../Elements/PictureLoader/PictureLoader';
import { ROLES_INFO } from '../../config/messages';
import SearchContext from '../../context/searchContext';

const EditInternalUser = (props) => {
  const [userInfo, setUserInfo] = useState({ ...SearchContext.editUser });

  useEffect(() => {
    console.log(userInfo.avatar);
  }, [userInfo]);

  const inputHandler = (event) => {
    setUserInfo(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };
  const dropdownHandler = (event) => {
    setUserInfo(((prevState) => ({ ...prevState, role: event.target.value.toLowerCase() })));
  };
  const createHandler = async (event) => {
    event.preventDefault();
    const request = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    };

    const response = await fetch('http://localhost:5000/user', request);

    if (response.status === 201) {
      props.history.push('/users');
    }
  };

  return (
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
          <Input label="First Name" type='text' id="firstname" required="required" value={userInfo.firstname} onChange={(event) => inputHandler(event)} />
          <Input label="Last Name" type='text' id="lastname" required="required" value={userInfo.lastname} onChange={(event) => inputHandler(event)} />
          <Input label="Email" type='email' id="email" required="required" value={userInfo.email} onChange={(event) => inputHandler(event)} />
          <Input label="Phone" type='tel' id="phone" value={userInfo.phone} onChange={(event) => inputHandler(event)} />
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
            options={['admin', 'manager', 'employee']}
            select={userInfo.role}
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
  );
};

export default withRouter(EditInternalUser);
