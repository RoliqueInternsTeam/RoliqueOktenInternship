import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import classes from './Campaigns.module.css';
import { getAll } from '../../helpers/ApiService';
import { setCampaignList } from '../../store/actions';
import Header from '../Common/Header/Header';
import Search from '../Common/Search/Search';
import Label from '../Elements/Label/Label';
import Dropdown from '../Elements/Dropdown/Dropdown';
import List from '../Common/List/List';
import TableRow from '../Common/TableRow/TableRow';
import Export from '../Elements/Icons/export.svg';
import Loading from '../Elements/Loading/Loading';
import Instagram from '../Elements/Logos/instagram.svg';
import TikTok from '../Elements/Logos/tiktok.svg';
import YouTube from '../Elements/Logos/youtube.svg';
import Facebook from '../Elements/Logos/facebook.svg';
import Twitter from '../Elements/Logos/twitter.svg';
import Blogger from '../Elements/Logos/blogger.svg';

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
    // setCampaigns(((prevState) => ({ ...prevState, role: value.toLowerCase() })));
    console.log(value);
  };

  const channelsHandler = (social) => {
    const profiles = [...social];
    const channels = [];
    for (let i = 0; i < profiles.length; i++) {
      if (profiles[i] === 'instagram') {
        profiles[i] = <img src={Instagram} alt='instagram' className={classes.channel} />;
        channels.push(profiles[i]);
      }
      if (profiles[i] === 'tiktok') {
        profiles[i] = <img src={TikTok} alt='tiktok' className={classes.channel} />;
        channels.push(profiles[i]);
      }
      if (profiles[i] === 'youtube') {
        profiles[i] = <img src={YouTube} alt='youtube' className={classes.channel} />;
        channels.push(profiles[i]);
      }
      if (profiles[i] === 'facebook') {
        profiles[i] = <img src={Facebook} alt='facebook' className={classes.channel} />;
        channels.push(profiles[i]);
      }
      if (profiles[i] === 'twitter') {
        profiles[i] = <img src={Twitter} alt='twitter' className={classes.channel} />;
        channels.push(profiles[i]);
      }
      if (profiles[i] === 'blog') {
        profiles[i] = <img src={Blogger} alt='blog' className={classes.channel} />;
        channels.push(profiles[i]);
      }
    }
    return channels.map((channel) => channel);
  };

  // eslint-disable-next-line no-unused-vars
  const optionsHandler = (option) => {
    const options = [];
    // campaigns.forEach((campaign) => options.push(campaign[option]));
    return options;
  };

  useEffect(() => {
    getAll('http://localhost:5000/campaign', access_token)
      .then((res) => {
        console.log(res);
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
      <div className={classes.body}>
        <div className={classes.filters}>
          <div className={classes.span}>
            Filters
            <label className={classes.counter}>{campaigns?.length}</label>
          </div>
          <Search placeholder='Search by title...' search={searchQuery} />
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
        <div className={classes.table}>
          {campaigns
            ? (
              <List
                headers={['Campaign Title', 'Brand', 'Start', 'End', 'Status', 'TL', 'Budget', 'Profit']}
                sort={[1, 2, 3, 4, 7, 8]}
                map={campaigns.map((campaign, index) => (
                  <TableRow
                    key={`${campaign._id}${index}`}
                    id={campaign._id}
                    class='effort'
                    effort={campaign.effort}
                    columns={{
                      avatar: campaign.logo,
                      title: campaign.title,
                      channels: campaign.social ? channelsHandler(campaign.social) : null,
                      brand: campaign.brand,
                      status: campaign.status,
                      teamLead: <Avatar name={campaign.teamLead} size="32px" round style={{ marginRight: '12px' }} />,
                      budget: campaign.budgetsTargets.totalBudget,
                      profit: campaign.profit,
                    }}
                    columnsOrder={[['avatar', 'title', 'channels'], 'brand', 'start', 'end', 'status', 'teamLead', 'budget', 'profit']}
                    to={`/influencer/${campaign._id}`}
                    tooltipMessage='Export Campaign'
                    imgAlt='Export Campaign'
                    rowBtn={Export}
                  />
                ))}
              />
            )
            : <Loading class='onList' />}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
