import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import classes from './Sidebar.module.css';
import Vector from '../Elements/Icons/vector.svg';
import Users from '../Elements/Icons/users.svg';
import Volume from '../Elements/Icons/volume.svg';
import At from '../Elements/Icons/at.svg';
import LogoutIcon from '../Elements/Icons/log-out.png';
import { Logout } from '../../helpers/ApiService';
import { logout } from '../../store/actions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const access_token = useSelector(({ access_token }) => access_token);

  const logoutHandler = async () => {
    Logout(access_token)
      .then(() => dispatch(logout()));
  };

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
      <NavLink onClick={logoutHandler} className={classes.logoutContainer} to="/login">
        <img src={LogoutIcon} alt="logout" className={classes.logout} />
      </NavLink>

    </div>
  );
};

export default withRouter(Sidebar);
