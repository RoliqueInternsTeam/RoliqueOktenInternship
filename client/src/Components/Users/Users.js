import React, { PureComponent } from 'react';
import Header from './Header/Header';
import Search from './Search/Search';
import UserList from './UserList/UserList';
import classes from './Users.module.css';

class Users extends PureComponent {
  render() {
    return (
      <div className={classes.div}>
        <Header />
        <Search />
        <UserList />
      </div>
    );
  }
}

export default Users;
