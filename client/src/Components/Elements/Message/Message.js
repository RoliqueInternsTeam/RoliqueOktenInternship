import React from 'react';
import './Message.css';

const Message = (props) => {
    return (
        <div className={`msgContainer ${props.style[0]}`}>
            <div className={`icon ${props.style[1]}`}><div className='mask'><div className='stick'></div><div className='dot'></div></div></div>
            <span className={props.style[2]}>{props.message}</span>
        </div>
    );
};

export default Message;