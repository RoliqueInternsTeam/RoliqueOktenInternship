import React from 'react';
import { withRouter } from 'react-router';
import Error from '../Icons/error.png';
import classes from './Toastr.module.css';

const Toastr = (props) => {
  setTimeout(() => props.history.push('/users'), 3000);
  return (
    <div className={classes.container}>
      <img src={Error} alt='error' className={classes.icon} />
      <label className={classes.label}>{props.message}</label>
    </div>
  );
};

export default withRouter(Toastr);
