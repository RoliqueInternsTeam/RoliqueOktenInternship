import React from 'react';
import classes from './EditButton.module.css';
import EditIcon from '../Icons/edit-alt.svg';

const EditButton = () => (
  <div>
    <button type='button' className={classes.button}>
      <img src={EditIcon} alt='Edit' className={classes.editImage} />
      Edit
    </button>
  </div>
);

export default EditButton;
