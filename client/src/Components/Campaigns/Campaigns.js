import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Campaigns.module.css';
import { getAll } from '../../helpers/ApiService';
import { setCampaignList } from '../../store/actions';
import Header from '../Common/Header/Header';
import Search from '../Common/Search/Search';
import Label from '../Elements/Label/Label';
import Dropdown from '../Elements/Dropdown/Dropdown';
// import List from '../Common/List/List';
// import TableRow from '../Common/TableRow/TableRow';
// import Export from '../Elements/Icons/export.svg';
// import Loading from '../Elements/Loading/Loading';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(null);

  const [search, setSearch] = useState('');
  const access_token = useSelector(({ access_token }) => access_token);

  const dispatch = useDispatch();
  const campaignList = useSelector(({ campaignList }) => campaignList);

  const searchQuery = (event) => {
    setCampaigns(campaignList);
    setSearch(event.target.value);
  };

  const dropdownHandler = (value) => {
    setUserInfo(((prevState) => ({ ...prevState, role: value.toLowerCase() })));
  };

  const optionsHandler = (option) => {
    const options = [];
    campaigns.forEach((campaign) => options.push(campaign[option]));
    return options;
  };

  useEffect(() => {
    getAll('http://localhost:5000/campaign', access_token)
      .then((res) => {
        setCampaigns(res);
        dispatch(setCampaignList(res));
      });
  }, []);

  useEffect(() => {
    if (search) {
      setCampaigns(campaigns.filter((campaign) => (campaign.title.toLowerCase().includes(search.toLowerCase()))));
    }
  }, [search]);

  // eslint-disable-next-line implicit-arrow-linebreak
  return (
    <div className={classes.mainContainer}>
      <Header title='Campaigns' button='createNew' />
      {/* {campaigns */}
      {/*  ? ( */}
      <div className={classes.body}>
        <div className={classes.filters}>
          <h2 className={classes.h2}>Filters</h2>
          <label className={classes.counter}>{campaigns.length}</label>
          <Search search={searchQuery} />
          <Label label='Planned channels' />
          <Dropdown
            label='Brand'
            onChange={(value) => dropdownHandler(value)}
            name='brand'
            options={optionsHandler('brand')}
          />
          <Dropdown
            label='Effort'
            onChange={(value) => dropdownHandler(value)}
            name='effort'
            options={optionsHandler('effort')}
          />
          <Dropdown
            label='Status'
            onChange={(value) => dropdownHandler(value)}
            name='status'
            options={optionsHandler('status')}
          />
          <Dropdown
            label='TL'
            onChange={(value) => dropdownHandler(value)}
            name='tl'
            options={optionsHandler('tl')}
          />
        </div>
      </div>
      {/* <List */}
      {/*  headers={['Campaign Title', 'Brand', 'Start', 'End', 'Status', 'TL', 'Budget', 'Profit']} */}
      {/*  sort={[1, 2, 3, 4, 7, 8]} */}
      {/*  map={campaigns.map((campaign, index) => ( */}
      {/*    <TableRow */}
      {/*      key={`${campaign._id}${index}`} */}
      {/*      id={campaign._id} */}
      {/*      columns={{ */}
      {/*        avatar: campaign.logo, */}
      {/*        title: campaign.title, */}
      {/*        channels: campaign.social ? channelsHandler(campaign.social) : null, */}
      {/*        brand: campaign.brand, */}
      {/*        status: campaign.brand, */}
      {/*        tl: campaign.brand, */}
      {/*        budget: campaign.brand, */}
      {/*        profit: campaign.brand, */}
      {/*      }} */}
      {/*      columnsOrder={[['avatar', 'title', 'channels'], 'brand', 'start', 'end', 'status', 'TL', 'Budget', 'Profit']} */}
      {/*      to={`/influencer/${campaign._id}`} */}
      {/*      tooltipMessage='Export Campaign' */}
      {/*      imgAlt='Export Campaign' */}
      {/*      rowBtn={Export} */}
      {/*    /> */}
      {/*  ))} */}
      {/* /> */}
      {/* ) : */}
      {/* <Loading class='onList' /> */}
      {/* } */}
    </div>
  );
};

export default Campaigns;
