import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../helpers/ApiService';
import { setInfluencerList } from '../../store/actions';
import Header from '../Common/Header/Header';
import Search from '../Common/Search/Search';
import List from '../Common/List/List';
import TableRow from '../Common/TableRow/TableRow';
import Rating from '../Elements/Icons/rating.svg';
// import Loading from '../Elements/Loading/Loading';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(null);

  const [search, setSearch] = useState('');
  const access_token = useSelector(({ access_token }) => access_token);

  const dispatch = useDispatch();
  const campaignList = useSelector(({ campaignList }) => campaignList);

  useEffect(() => {
    getAll('http://localhost:5000/campaign', access_token)
      .then((res) => {
        setCampaigns(res);
        dispatch(setInfluencerList(res));
      });
  }, []);

  const searchQuery = (event) => {
    setCampaigns(campaignList);
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search) {
      setCampaigns(campaigns.filter((campaign) => (campaign.title.toLowerCase().includes(search.toLowerCase()))));
    }
  }, [search]);

  return (
    <div>
      <Header title='Campaigns' button='createNew' />
      <Search search={searchQuery} />
      {/* {campaigns */}
      {/*  ? ( */}
      <List
        column1='Username'
        column2='Name'
        column3='Channels'
        column4='Rating'
        map={campaigns.map((influencer) => (
          <TableRow
            key={influencer._id}
            id={influencer._id}
            avatar={influencer.avatar}
            column1={usernameHandler(influencer.social)}
            column2={`${influencer.firstName} ${influencer.lastName}`}
            column3={influencer.social ? channelsHandler(influencer.social) : null}
            column4={<img src={Rating} alt='rating' />}
            to={`/influencer/${influencer._id}`}
            tooltipMessage='Open Influencer'
            imgAlt='Open Influencer'
          />
        ))}
      />
      {/* ) : */}
      {/* <Loading class='onList' /> */}
      {/* } */}
    </div>
  );
};

export default Campaigns;
