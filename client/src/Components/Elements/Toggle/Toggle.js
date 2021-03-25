import React from 'react';
import classes from'./Toggle.module.css';

const Toggle = () => {
    return (
            <label className={classes.switch}>
                <input type='checkbox' className={classes.toggle}/>
                    <span className={classes.slider}></span>
            </label>
    );
};

export default Toggle;