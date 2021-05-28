import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Common/Header/Header';
import Search from '../Common/Search/Search';
import classes from './Users.module.css';
import List from '../Common/List/List';
import { setUserList } from '../../store/actions';
import TableRow from '../Common/TableRow/TableRow';
import { getAll } from '../../helpers/ApiService';
import Loading from '../Elements/Loading/Loading';
import Edit from '../Elements/Icons/combined-shape.svg';

const Users = () => {
  const [users, setUsers] = useState(null);
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
      {users
        ? (
          <List
            headers={['Name', 'email', 'Role', 'Phone']}
            sort={[1, 2]}
            map={users.map((user, index) => (
              <TableRow
                key={`${user._id}${index}`}
                id={user._id}
                role={user.role}
                columns={{
                  name: `${user.firstName} ${user.lastName}`,
                  avatar: user.avatar,
                  email: user.email,
                  role: capitalizeFirstLetter(user.role),
                  phone: user.phone,
                }}
                columnsOrder={[['avatar', 'name'], 'email', 'role', 'phone']}
                to={`/users/edit/${user._id}`}
                tooltipMessage='Edit User'
                imgAlt='Edit User'
                rowBtn={Edit}
              />
            ))}
          />
        )
        : <Loading class='onList' />}
    </div>
  );
};

export default Users;
