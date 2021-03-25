import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import classes from './Sidebar.module.css';
import Vector from '../Elements/Icons/vector.svg';
import Users from '../Elements/Icons/users.svg';
import Volume from '../Elements/Icons/volume.svg';
import At from '../Elements/Icons/at.svg';

import './myCss.css';

const Sidebar = (props) => (
  <div className={classes.sidebar}>
    <div className={classes.vectorContainer}>
      <img src={Vector} alt="vector icon" />
    </div>
    <NavLink className={classes.imgContainer} to="/create">
      <img src={Users} alt="create user" />
    </NavLink>
    <div className={classes.imgContainer} onClick={() => props.history.push('/campaigns')}>
      <img src={Volume} alt="campaigns" />
    </div>
    <div className={classes.imgContainer} onClick={() => props.history.push('/users')}>
      <img src={At} alt="users" />
    </div>
  </div>
);

export default withRouter(Sidebar);
