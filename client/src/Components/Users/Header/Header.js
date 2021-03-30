import React from 'react';
import classes from './Header.module.css';
import Createnew from '../../Elements/Createnew/Createnew';

const Header = () => (
  <div className={classes.div}>
    <h1 className={classes.h1}>Users</h1>
    <div className={classes.createnew}><Createnew /></div>
  </div>
);

export default Header;
