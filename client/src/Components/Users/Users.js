import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Common/Header/Header';
import Search from '../Common/Search/Search';
import classes from './Users.module.css';
import List from '../Common/List/List';
import RefreshToken from '../../helpers';
import { setUser, setUserList } from '../../store/actions';
import TableRow from '../Common/TableRow/TableRow';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const access_token = useSelector(({ access_token }) => access_token);

  const userList = useSelector(({ userList }) => userList);
  const dispatch = useDispatch();

  const searchQuery = (event) => {
    setUsers(userList);
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search) {
      setUsers(users.filter((user) => ([user.firstName, user.lastName].join(' ').toLowerCase().includes(search.toLowerCase()))));
    }
  }, [search]);

  const GetUsers = async () => {
    const request = {
      method: 'GET',
      headers: {
        AUTHORIZATION: access_token,
      },
    };
    const response = await fetch('http://localhost:5000/user', request);

    if (response.status === 200) {
      const usersResponse = await response.json();
      setUsers(usersResponse);
      dispatch(setUserList(usersResponse));
    }
    if (response.status === 401) {
      await RefreshToken();
    }
  };

  useEffect(() => {
    GetUsers();
  }, [access_token]);

  return (
    <div className={classes.Users}>
      <Header title='Users' button='createNew' />
      <Search search={searchQuery} />
      <List
        column1='Name'
        column2='email'
        column3='Role'
        column4='Phone'
        map={users.map((user) => (
          <TableRow
            key={user._id}
            avatar={user.avatar}
            column1={user.firstName}
            column11={user.lastName}
            column2={user.email}
            column3={user.role}
            column4={user.phone}
            to='/edit'
            tooltipMessage='Edit User'
            imgAlt='Edit User'
            onClick={() => {
              dispatch(setUser(user));
            }}
          />
        ))}
      />
    </div>
  );
};

export default Users;
