import React from 'react';
import classes from './Tooltip.module.css'

const Tooltip = (props) => {
    // const arrowClass=[classes.arrow, classes[props.arrowLocation]]

    return (
        <div className={classes.tooltip}>
            <div className={classes.body}>
                <p className={classes.p}>{props.message}</p>
            </div>
            <div className={classes.arrowContainerTop}>
                <div className={classes.arrowMaskTop}>
                    <div className={`${classes.arrow} ${classes[props.arrowLocation]}`}></div>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;