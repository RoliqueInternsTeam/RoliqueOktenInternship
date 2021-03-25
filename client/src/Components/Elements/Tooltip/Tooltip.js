import React from 'react';
import classes from './Tooltip.module.css'

const Tooltip = (props) => {

    return (
        <div className={`${classes.tooltip} ${classes[props.arrowPlace]}`}>
            <div className={`${classes.body} ${classes[props.arrowPlace]} ${classes[props.color]}`}>
                <p className={`${classes.p} ${classes[props.color]}`}>{props.message}</p>
            </div>
            <div className={`${classes.arrowContainer} ${classes[props.arrowPlace]}`}>
                <div className={`${classes.arrowMask} ${classes[props.align]}`}>
                    <div className={`${classes.arrow} ${classes[props.arrowPlace]} ${classes[props.color]}`}/>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;