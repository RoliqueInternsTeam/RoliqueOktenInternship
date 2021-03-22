import React from 'react';
import './Checkbox.css';

const Checkbox = () => {
    return (
        <label className="container">
            <input type="checkbox"/>
                <span className="checkmark"></span>
        </label>
);
};

export default Checkbox;