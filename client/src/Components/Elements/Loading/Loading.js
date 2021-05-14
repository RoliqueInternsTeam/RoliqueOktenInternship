import HashLoader from 'react-spinners/HashLoader';
import React from 'react';
import classes from './Loading.module.css';

const Loading = (props) => (
  <div className={classes[props.class]}>
    <HashLoader size={100} color='#121033' />
  </div>
);

export default Loading;
