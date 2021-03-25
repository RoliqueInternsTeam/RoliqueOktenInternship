import React from 'react';
import classes from './Checkbox.module.css';

const Checkbox = (props) => {
    return (
        <label className={classes.container}>{props.message}
            <input type="checkbox"/>
                <span className={classes.checkmark}></span>
        </label>
);
};

export default Checkbox;