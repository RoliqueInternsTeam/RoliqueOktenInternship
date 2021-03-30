import React from 'react';
import classes from './Message.module.css';

const Message = (props) => (
  <div className={`${classes.msgContainer} ${classes[props.style[0]]}`}>
    <div className={`${classes.icon} ${classes[props.style[1]]}`}>
      <div className={classes.mask}>
        <div className={classes.stick} />
        <div className={classes.dot} />
      </div>
    </div>
    <span className={classes[props.style[2]]}>{props.message}</span>
  </div>
);

export default Message;
