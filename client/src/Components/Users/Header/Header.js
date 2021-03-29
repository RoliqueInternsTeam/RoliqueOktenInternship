import React from 'react';
import classes from './Header.module.css';
import Dropdown from '../../Elements/Dropdown/Dropdown';

const Header = () => (
  <div className={classes.div}>
    <h1 className={classes.h1}>Users</h1>
    <Dropdown options={['Campaign', 'Influencer', 'Internal User']} />
  </div>
);

export default Header;
