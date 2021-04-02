import React from 'react';
import { withRouter } from 'react-router';
import classes from './Header.module.css';
import Arrow from '../Icons/arrow.svg';
import CreateNew from '../Createnew/CreateNew';
import EditButton from '../EditButton/EditButton';

const Header = (props) => {
  const buttonCheck = () => {
    switch (props.button) {
      default:
        return null;
      case 'saveChanges':
        return <button type='submit' className={classes.button}>Save changes</button>;
      case 'createNew':
        return <CreateNew className={classes.createNew} />;
      case 'edit':
        return (
          <div>
            <EditButton />
            <CreateNew />
          </div>
        );
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          { props.arrow ? <img src={Arrow} alt='Arrow button' className={classes.arrow} onClick={() => props.history.goBack()} /> : null }
          <h1>{props.title}</h1>
        </div>
        {buttonCheck(props)}
      </div>
    </div>
  );
};

export default withRouter(Header);
