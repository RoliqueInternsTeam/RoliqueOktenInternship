import React from 'react';
import PropTypes from 'prop-types';
import classes from './Tooltip.module.css';

const Tooltip = (props) => (
  <div className={`${classes.tooltip} ${classes[props.arrowPlace]}`}>
    <div className={`${classes.body} ${classes[props.arrowPlace]} ${classes[props.color]}`}>
      <p className={`${classes.p} ${classes[props.color]}`}>{props.message}</p>
    </div>
    <div className={`${classes.arrowContainer} ${classes[props.arrowPlace]}`}>
      <div className={`${classes.arrowMask} ${classes[props.align]}`}>
        <div className={`${classes.arrow} ${classes[props.arrowPlace]} ${classes[props.color]}`} />
      </div>
    </div>
  </div>
);

Tooltip.propTypes = {
  arrowPlace: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,

};

export default Tooltip;
