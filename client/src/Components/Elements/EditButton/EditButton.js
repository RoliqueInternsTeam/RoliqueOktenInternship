import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import classes from './EditButton.module.css';
import EditIcon from '../Icons/edit-alt.svg';
import PermissionChecker from '../../Common/PermissionChecker/PermissionChecker';
import { ADMIN, MANAGER } from '../../../config/constants';

const EditButton = (props) => (
  <PermissionChecker permission={[ADMIN, MANAGER]} display={null}>
    <NavLink to={props.to}>
      <button type='button' className={classes.button}>
        <img src={EditIcon} alt='Edit' className={classes.editImage} />
        Edit
      </button>
    </NavLink>
  </PermissionChecker>
);

export default withRouter(EditButton);
