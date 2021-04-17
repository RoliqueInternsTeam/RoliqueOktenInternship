import React from 'react';
import classes from './SocialMedia.module.css';

const SocialMedia = (props) => (
  <div className={`${classes.container} ${classes[props.style]}`}>
    <img src={props.platform} alt={props.alt} className={classes.image} />
    <label className={classes.label}>
      {props.username}
      <br />
      {props.followers}
    </label>
  </div>
);

export default SocialMedia;
