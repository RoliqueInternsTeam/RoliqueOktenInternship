import React, { useContext, useEffect, useState } from 'react';
import SingleUser from './SingleUser/SingleUser';
import classes from './UserList.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import SearchContext from '../../../context/searchContext';

const urlUsers = 'http://localhost:5000/user';

const UserList = () => {
  const searchContext = useContext(SearchContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  searchContext.searchHandler = (event) => {
    setUsers(searchContext.userList);
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetch(urlUsers)
      .then((res) => res.json())
      .then((data) => {
        searchContext.userList = [...data];
        setUsers(searchContext.userList);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (search) {
      setUsers(users.filter((user) => ([user.firstName || user.firstname, user.lastName || user.lastname].join(' ').toLowerCase().includes(search.toLowerCase()))));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Auxiliary>
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
          {users.map((user) => (<SingleUser key={user._id} {...user} />))}
        </tbody>
      </table>
    </Auxiliary>
  );
};

export default UserList;
