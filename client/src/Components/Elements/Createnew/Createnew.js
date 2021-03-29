import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Createnew.module.css';

const Createnew = () => (
  <div>
    <button type='button' className={classes.button}>Create New</button>
    <div className={classes.dropdown}>
      <NavLink className={classes.link} to="/create/campaign">Campaign</NavLink>
      <NavLink className={classes.link} to="/create/influencer">Influencer</NavLink>
      <NavLink className={classes.link} to="/create/user">Internal User</NavLink>
    </div>
  </div>
);

export default Createnew;
