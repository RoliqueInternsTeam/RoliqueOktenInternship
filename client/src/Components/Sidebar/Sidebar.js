import React from 'react';
import { withRouter } from 'react-router';

import classes from './Sidebar.module.css';
import Vector from '../Elements/Icons/vector.svg'
import Users from '../Elements/Icons/users.svg'
import Volume from '../Elements/Icons/volume.svg'
import At from '../Elements/Icons/at.svg'

const Sidebar = (props) => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.vectorContainer}>
            <img src={Vector}/>
            </div>
            <div className={classes.imgContainer}>
            <img src={Users} onClick={() => props.history.push('/create')}/>
            </div>
            <div className={classes.imgContainer}>
            <img src={Volume} onClick={() => props.history.push('/campaigns')}/>
            </div>
            <div className={classes.imgContainer}>
            <img src={At} onClick={() => props.history.push('/users')}/>
            </div>
        </div>
    );
};

export default withRouter(Sidebar);