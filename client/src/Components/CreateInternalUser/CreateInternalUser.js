import React from 'react';
import { withRouter } from 'react-router';
import classes from './CreateInternalUser.module.css';
import Arrow from '../Elements/Icons/arrow.svg';
import Info from '../Elements/Icons/info.svg';
import ProfilePicture from '../Elements/Icons/profile-picture.svg';
import Input from '../Elements/Input/Input';
import Dropdown from '../Elements/Dropdown/Dropdown';

const CreateInternalUser = (props) => (
  <form className={classes.mainContainer}>
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <img src={Arrow} alt='Arrow button' className={classes.arrow} onClick={() => props.history.goBack()} />
        <h1>Create Internal User</h1>
      </div>
      <button type='submit' className={classes.button}>Save changes</button>
    </div>
    <div className={classes.body}>
      <div className={classes.leftContainer}>
        <h4>General</h4>
        <p className={classes.profileLabel}>Profile Picture</p>
        <img src={ProfilePicture} alt='Add a profile avatar' className={classes.profilePicture} />
        <Input label="First Name" type='text' id="firstName" required="required" />
        <Input label="Last Name" type='text' id="lastName" required="required" />
        <Input label="Email" type='email' id="email" required="required" />
        <Input label="Phone" type='tel' id="phone" />
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.rolesInfo}>
          <h4>Roles & Permissions</h4>
          <img src={Info} alt='info' className={classes.info} />
        </div>
        <Dropdown label="Role" name="roles" options={['Admin', 'Manager', 'Employee']} required="required" />
        <div className={classes.passwordContainer}>
          <h4>Password</h4>
          <Input label="Set Password" type='password' id="password" required="required" />
        </div>
      </div>
    </div>
  </form>
);

export default withRouter(CreateInternalUser);
