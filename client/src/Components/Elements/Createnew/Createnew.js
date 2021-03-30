import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import classes from './Createnew.module.css';
import Aux from '../../../hoc/Aux';

const Createnew = () => (
  <Aux>
    <input type='checkbox' className={classes.input} id='checkbox' />
    <label className={classes.label} htmlFor="checkbox">
      Create New
    </label>
    <div className={classes.dropdown}>
      <NavLink className={classes.link} to='/create'>Campaign</NavLink>
      <NavLink className={classes.link} to="/create">Influencer</NavLink>
      <NavLink className={classes.link} to="/create">Internal User</NavLink>
    </div>
  </Aux>
);
export default withRouter(Createnew);
