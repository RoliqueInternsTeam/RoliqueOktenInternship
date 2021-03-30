import React from 'react';
import SingleUser from './SingleUser/SingleUser';
import classes from './UserList.module.css';
import users from '../../../Database/Users';
import Aux from '../../../hoc/Aux';

const UserList = () => (
  <Aux>
    <table className={classes.table}>
      <tbody>
        <tr className={classes.header}>
          <th className={classes.th}><span className={classes.span}>Name</span></th>
          <th><span className={classes.span}>Email</span></th>
          <th><span className={classes.span}>Role</span></th>
          <th colSpan='2'><span className={classes.span}>Phone</span></th>
        </tr>
        {users.map((user) => (<SingleUser key={user.id} {...user} />))}
      </tbody>
    </table>
  </Aux>
);

export default UserList;
