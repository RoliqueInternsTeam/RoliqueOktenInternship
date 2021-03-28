import React from 'react';
import SingleUser from './SingleUser/SingleUser';
import classes from './UserList.module.css';
import users from '../../../Database/Users';

const UserList = () => (
  <div className={classes.UserList}>
    <table className={classes.table}>
      <tbody>
        <tr className={classes.header}>
          <th className={classes.th}><span className={classes.span}>Name</span></th>
          <th><span className={classes.span}>Email</span></th>
          <th><span className={classes.span}>Role</span></th>
          <th colSpan='2'><span className={classes.span}>Phone</span></th>
        </tr>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {users.map((user) => (<SingleUser key={user.id} {...user} />))}
      </tbody>

    </table>
  </div>
);

export default UserList;
