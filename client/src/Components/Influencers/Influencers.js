import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Common/Header/Header';
import classes from './Influencers.module.css';
import Search from '../Common/Search/Search';
import List from '../Common/List/List';
import TableRow from '../Common/TableRow/TableRow';
import { setInfluencerList } from '../../store/actions';
import RefreshToken from '../../helpers';

const Influencers = () => {
  const [influencers, setInfluencers] = useState([]);
  // const [search, setSearch] = useState('');
  const access_token = useSelector(({ access_token }) => access_token);

  const dispatch = useDispatch();

  const getInfluencers = async () => {
    const request = {
      method: 'GET',
      headers: {
        AUTHORIZATION: access_token,
      },
    };
    const response = await fetch('http://localhost:5000/influencer', request);
    console.log(response);
    if (response.status === 200) {
      const influencersResponse = await response.json();
      setInfluencers(influencersResponse);
      dispatch(setInfluencerList(influencersResponse));
    }
    if (response.status === 401) {
      await RefreshToken();
    }
  };

  useEffect(() => {
    getInfluencers();
  }, [access_token]);

  return (
    <div className={classes.mainContainer}>
      <Header title='Influencers' button='createNew' />
      <div className={classes.body}>
        <Search />
        <List
          column1='Username'
          column2='Name'
          column3='Channels'
          column4='Rating'
          map={influencers.map((influencer) => (
            <TableRow
              key={influencer._id}
              avatar={influencer.avatar}
              column1={influencer.firstName}
              column11={influencer.lastName}
              column2={influencer.socialProfiles}
              to='/edit'
              tooltipMessage='Edit User'
              imgAlt='Edit User'
            />
          ))}
        />
      </div>
    </div>
  );
};
export default Influencers;
