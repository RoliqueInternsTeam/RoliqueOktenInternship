import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import classes from './Message.module.css';

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
  position: PropTypes.string,
  message: PropTypes.string.isRequired,
};

Message.defaultProps = {
  redirect: false,
  position: '',
};

export default withRouter(Message);
