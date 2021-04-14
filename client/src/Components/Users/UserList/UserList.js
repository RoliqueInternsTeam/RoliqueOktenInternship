import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SingleUser from './SingleUser/SingleUser';
import classes from './UserList.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import SearchContext from '../../../context/searchContext';
import RefreshToken from '../../../helpers';

const UserList = () => {
  const searchContext = useContext(SearchContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const access_token = useSelector(({ access_token }) => access_token);

  searchContext.searchHandler = (event) => {
    setUsers(searchContext.userList);
    setSearch(event.target.value);
  };

  const GetUsers = async () => {
    console.log('GetUsers', access_token);
    const request = {
      method: 'GET',
      headers: {
        AUTHORIZATION: access_token,
      },
    };
    const response = await fetch('http://localhost:5000/user', request);

    if (response.status === 200) {
      searchContext.userList = await response.json();
      setUsers(searchContext.userList);
    }
    if (response.status === 401) {
      await RefreshToken();
    }
  };

  useEffect(() => {
    GetUsers();
  }, [access_token]);

  useEffect(() => {
    if (search) {
      setUsers(users.filter((user) => ([user.firstName, user.lastName].join(' ').toLowerCase().includes(search.toLowerCase()))));
    }
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
