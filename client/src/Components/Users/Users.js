import React, { Component } from 'react';
import Header from './Header/Header';
import Search from './Search/Search';
import UserList from './UserList/UserList';
import classes from './Users.module.css';

class Users extends Component {
  render() {
    return (
      <div className={classes.Users}>
        <Header />
        <div className={classes.container}>
          <Search />
          <UserList />
        </div>
      </div>
    );
  }
}

export default Users;