import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import classes from './CreateNew.module.css';
import PermissionChecker from '../PermissionChecker/PermissionChecker';
import { ADMIN, MANAGER } from '../../../config/constants';

const CreateNew = () => (
  <PermissionChecker permission={[ADMIN, MANAGER]} display={null}>
    <div className={classes.container}>
      <input type='checkbox' className={classes.input} id='checkbox' />
      <label className={classes.label} htmlFor="checkbox">
        Create New
      </label>
      <div className={classes.dropdown}>
        <NavLink className={classes.link} to='/create'>Campaign</NavLink>
        <NavLink className={classes.link} to="/create">Influencer</NavLink>
        <NavLink className={classes.link} to="/create">Internal User</NavLink>
      </div>
    </div>
  </PermissionChecker>
);
export default withRouter(CreateNew);
