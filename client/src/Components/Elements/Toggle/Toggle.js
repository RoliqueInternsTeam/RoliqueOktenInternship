import React from 'react';
import './Toggle.css';

const Toggle = () => {
    return (
            <label className='toggleLabel'>
                <input type='checkbox' className='toggle'/>
                    <span></span>
            </label>
    );
};

export default Toggle;