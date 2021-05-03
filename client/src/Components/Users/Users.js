import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Common/Header/Header';
import Search from '../Common/Search/Search';
import classes from './Users.module.css';
import List from '../Common/List/List';
import { setUserList } from '../../store/actions';
import TableRow from '../Common/TableRow/TableRow';
import { getAll } from '../../helpers/ApiService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const access_token = useSelector(({ access_token }) => access_token);

  const userList = useSelector(({ userList }) => userList);
  const dispatch = useDispatch();

  useEffect(() => {
    getAll('http://localhost:5000/user', access_token)
      .then((res) => {
        setUsers(res);
        dispatch(setUserList(res));
      });
  }, []);

  const searchQuery = (event) => {
    setUsers(userList);
    setSearch(event.target.value);
  };

  const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

  useEffect(() => {
    if (search) {
      setUsers(users.filter((user) => ([user.firstName, user.lastName].join(' ').toLowerCase().includes(search.toLowerCase()))));
    }
  }, [search]);

  return (
    <div className={classes.mainContainer}>
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
            role={user.role}
            avatar={user.avatar}
            column1={user.firstName}
            column11={user.lastName}
            column2={user.email}
            column3={capitalizeFirstLetter(user.role)}
            column4={user.phone}
            to={`/users/edit/${user._id}`}
            tooltipMessage='Edit User'
            imgAlt='Edit User'
          />
        ))}
      />
    </div>
  );
};

export default Users;
