import React from 'react';
import classes from './EditButton.module.css';
import EditIcon from '../Icons/edit-alt.svg';
import PermissionChecker from '../PermissionChecker/PermissionChecker';
import { ADMIN, MANAGER } from '../../../config/constants';

const EditButton = () => (
  <PermissionChecker permission={[ADMIN, MANAGER]} display={null}>
    <div>
      <button type='button' className={classes.button}>
        <img src={EditIcon} alt='Edit' className={classes.editImage} />
        Edit
      </button>
    </div>
  </PermissionChecker>
);

export default EditButton;
