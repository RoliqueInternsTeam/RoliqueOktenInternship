import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import classes from './Sidebar.module.css';
import Vector from '../Elements/Icons/vector.svg';
import Users from '../Elements/Icons/users.svg';
import Volume from '../Elements/Icons/volume.svg';
import At from '../Elements/Icons/at.svg';
import Logout from '../Elements/Icons/log-out.png';
import { LOGOUT } from '../../store/actionTypes';

const logout = () => ({ type: LOGOUT });

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.sidebar}>
      <div className={classes.vectorContainer}>
        <img src={Vector} alt="vector icon" />
      </div>
      <NavLink activeClassName={classes.active} className={classes.imgContainer} to="/users">
        <img src={Users} alt="users" />
      </NavLink>
      <NavLink activeClassName={classes.active} className={classes.imgContainer} to="/campaigns">
        <img src={Volume} alt="campaigns" />
      </NavLink>
      <NavLink activeClassName={classes.active} className={classes.imgContainer} to="/influencers">
        <img src={At} alt="influencers" />
      </NavLink>
      <NavLink onClick={() => dispatch(logout())} className={classes.logoutContainer} to="/login">
        <img src={Logout} alt="logout" className={classes.logout} />
      </NavLink>

    </div>
  );
};

export default withRouter(Sidebar);
