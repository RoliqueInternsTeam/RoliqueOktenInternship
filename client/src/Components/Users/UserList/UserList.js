import React, { useContext, useEffect, useState } from 'react';
import SingleUser from './SingleUser/SingleUser';
import classes from './UserList.module.css';
import userslist from '../../../Database/Users';
import Aux from '../../../hoc/Aux';
import SearchContext from '../../../context/searchContext';

// const urlUsers = 'http://localhost:5000/users';

const UserList = () => {
  // useEffect(() => {
  //   fetch(urlUsers)
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data));
  // }, []);

  const searchContext = useContext(SearchContext);

  const [users, setUsers] = useState(userslist);
  const [search, setSearch] = useState('');

  searchContext.searchHandler = (event) => {
    setUsers(userslist);
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search) {
      setUsers(users.filter((user) => ([user.firstName, user.lastName].join(' ').toLowerCase().includes(search.toLowerCase()))));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Aux>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}><span className={classes.span}>Name</span></th>
            <th><span className={classes.span}>Email</span></th>
            <th><span className={classes.span}>Role</span></th>
            <th colSpan='2'><span className={classes.span}>Phone</span></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (<SingleUser key={user.id} {...user} />))}
        </tbody>
      </table>
    </Aux>
  );
};

export default UserList;
