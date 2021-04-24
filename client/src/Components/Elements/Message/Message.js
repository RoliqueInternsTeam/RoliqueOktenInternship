import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import classes from './Message.module.css';
import {
  INVALID_CREDENTIALS,
  PHOTO_SIZE_EXCEED,
  RESTRICTED_ACCESS,
  ROLES_INFO,
  SOMETHING_WRONG,
} from '../../../config/messages';

const Message = (props) => {
  props.redirect ? setTimeout(() => props.history.push('/users'), 3000) : null;

  return (
    <label className={`${classes.msgContainer} ${classes[props.style[0]]} ${classes[props.position]}`}>
      <div className={`${classes.icon} ${classes[props.style[1]]}`}>
        <div className={classes.mask}>
          <div className={classes.stick} />
          <div className={classes.dot} />
        </div>
      </div>
      <span className={classes[props.style[2]]}>{props.message}</span>
    </label>
  );
};

Message.propTypes = {
  redirect: PropTypes.bool,
  style: PropTypes.arrayOf(PropTypes.string).isRequired,
  position: PropTypes.oneOf(['absolute']),
  message: PropTypes.oneOf([INVALID_CREDENTIALS, ROLES_INFO, PHOTO_SIZE_EXCEED, RESTRICTED_ACCESS, SOMETHING_WRONG]).isRequired,
};

Message.defaultProps = {
  redirect: false,
  position: '',
};

export default withRouter(Message);
