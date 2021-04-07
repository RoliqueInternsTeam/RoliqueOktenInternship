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
import { LOGOUT } from '../../store/actions';

const logout = () => ({ type: LOGOUT });

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.sidebar}>
      <div className={classes.vectorContainer}>
        <img src={Vector} alt="vector icon" />
      </div>
      <NavLink activeClassName={classes.active} className={classes.imgContainer} to="/create">
        <img src={Users} alt="create user" />
      </NavLink>
      <NavLink activeClassName={classes.active} className={classes.imgContainer} to="/campaigns">
        <img src={Volume} alt="campaigns" />
      </NavLink>
      <NavLink activeClassName={classes.active} className={classes.imgContainer} to="/users">
        <img src={At} alt="users" />
      </NavLink>
      <NavLink onClick={() => dispatch(logout())} className={classes.logoutContainer} to="/login">
        <img src={Logout} alt="logout" className={classes.logout} />
      </NavLink>

    </div>
  );
};

export default withRouter(Sidebar);
