import React from 'react';
import PropTypes from 'prop-types';
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

SocialMedia.propTypes = {
  style: PropTypes.arrayOf(PropTypes.string).isRequired,
  platform: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
};

export default SocialMedia;
