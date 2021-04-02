import React, { useState } from 'react';

import { MAX_PHOTO_SIZE, PHOTO_MIMETYPES } from '../../../config/constants';
import classes from './PictureLoader.module.css';
import ProfilePicture from '../Icons/profile-picture.svg';
import Message from '../Message/Message';
import { PHOTO_SIZE_EXCEED } from '../../../config/messages';

const PictureLoader = (props) => {
  const [error, setError] = useState(null);
  const onChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      if (image.size > MAX_PHOTO_SIZE) {
        setError(PHOTO_SIZE_EXCEED);
      }
      if (image.size < MAX_PHOTO_SIZE) {
        setError(null);
        props.setState(((prevState) => ({ ...prevState, picture: image })));
      }
    }
  };

  return (
    <div className={classes.container}>
      <label className={classes.profileLabel} htmlFor='avatar'>{props.label}</label>
      <img src={props.avatar ? props.avatar : ProfilePicture} alt={props.alt} className={classes.profilePicture} />
      <input type='file' id='avatar' accept={PHOTO_MIMETYPES} onChange={onChange} className={classes.input} />
      { error ? <Message message={error} style={['error-bg-color', 'error-icon-color', 'error-text-color']} /> : null }
    </div>
  );
};

export default PictureLoader;
