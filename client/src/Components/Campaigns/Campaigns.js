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
import Story from '../Elements/Logos/instagram-stories.svg';
import Blogger from '../Elements/Logos/blogger.svg';
import Snapchat from '../Elements/Logos/snapchat.svg';
import Input from '../Elements/Input/Input';
import DateFormat from '../../helpers/DateFormat';
import useSortableData from '../../helpers/useSortableData';

const Campaigns = () => {
  const dispatch = useDispatch();
  const access_token = useSelector(({ access_token }) => access_token);
  const campaignList = useSelector(({ campaignList }) => campaignList);

  const [campaigns, setCampaigns] = useState([...campaignList]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchedCampaigns, setSearchedCampaigns] = useState([]);
  const [campaignsTable, setCampaignsTable] = useState([...campaignList]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  // const [sortConfig, setSortConfig] = useState(null);
  const { items, requestSort } = useSortableData(campaignsTable);

  useEffect(() => {
    getAll('http://localhost:5000/campaign', access_token)
      .then((res) => {
        console.log(res);
        setCampaigns(res);
        dispatch(setCampaignList(res));
      });
  }, []);

  const searchHandler = (event) => {
    if (filteredCampaigns.length !== 0) {
      setSearchedCampaigns([...filteredCampaigns]);
    } else {
      setSearchedCampaigns([...campaigns]);
    }
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search) {
      setSearchedCampaigns(searchedCampaigns.filter((campaign) => (campaign.title.toLowerCase().includes(search.toLowerCase()))));
    }
    if (!search) {
      setSearchedCampaigns([]);
    }
  }, [search]);

  useEffect(() => {
    if (search || searchedCampaigns.length) {
      setCampaignsTable([...searchedCampaigns]);
    }
  }, [searchedCampaigns]);

  const filterHandler = (key, value) => {
    if (searchedCampaigns.length !== 0 && search) {
      setFilteredCampaigns([...searchedCampaigns]);
    } else {
      setFilteredCampaigns([...campaigns]);
    }
    setFilters((prevState) => ({
      ...prevState,
      [key]: value.key || value,
    }));
  };

  useEffect(() => {
    if (Object.keys(filters).length !== 0) {
      setFilteredCampaigns(filteredCampaigns.filter((campaign) => Object.keys(filters).every((key) => ((['instagram', 'twitter', 'youtube', 'facebook', 'tiktok', 'story', 'snapchat'].includes(key))
        ? (campaign.social.includes(key))
        : (campaign[key].toLowerCase() === filters[key].toLowerCase())))));
    }
  }, [filters]);

  useEffect(() => {
    if (Object.keys(filters).length) {
      setCampaignsTable([...filteredCampaigns]);
    }
  }, [filteredCampaigns]);

  const optionsHandler = (option) => {
    const options = [];
    if (campaignList) {
      campaignList.forEach((campaign) => (options.includes(campaign[option]) ? null : options.push(campaign[option])));
    }
    return options;
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

  const socialFilterHandler = (event) => {
    console.log(event.target.name);
    filterHandler(event.target.name, true);
    console.log(event.target.clicked);
    // eslint-disable-next-line no-param-reassign
    event.target.clicked = !event.target.clicked;
  };

  // React.useMemo(() => {
  //   const sortedProducts = [...campaignsTable];
  //   console.log(sortedProducts);
  //   console.log(sortConfig);
  //   if (sortConfig !== null) {
  //     sortedProducts.sort((a, b) => {
  //       if (a[sortConfig.key] < b[sortConfig.key]) {
  //         return sortConfig.direction === 'ascending' ? -1 : 1;
  //       }
  //       if (a[sortConfig.key] > b[sortConfig.key]) {
  //         return sortConfig.direction === 'ascending' ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }
  //   console.log(sortedProducts);
  //   return setCampaignsTable([...sortedProducts]);
  // }, [campaignsTable, sortConfig]);
  //
  // const requestSort = (key) => {
  //   console.log(key);
  //   let direction = 'ascending';
  //   if (sortConfig?.key === key && sortConfig?.direction === 'ascending') {
  //     direction = 'descending';
  //   }
  //   setSortConfig({ key, direction });
  // };

  return (
    <div className={classes.mainContainer}>
      <Header title='Campaigns' button='createNew' />
      <div className={classes.body}>
        <div className={classes.filters}>
          <div className={classes.span}>
            Filters
            <label className={classes.counter}>{campaignsTable?.length}</label>
          </div>
          <Search placeholder='Search by title...' search={searchHandler} />
          <Label label='Planned channels' />
          <div className={classes.channelsDiv}>
            <input type="image" alt='instagram' clicked='false' name='instagram' src={Instagram} onClick={(event) => socialFilterHandler(event)} />
            <input type="image" alt='twitter' name='twitter' src={Twitter} onClick={(event) => socialFilterHandler(event)} />
            <input type="image" alt='youtube' name='youtube' src={YouTube} onClick={(event) => socialFilterHandler(event)} />
            <input type="image" alt='facebook' name='facebook' src={Facebook} onClick={(event) => socialFilterHandler(event)} />
            <input type="image" alt='tiktok' name='tiktok' src={TikTok} onClick={(event) => socialFilterHandler(event)} />
            <input type="image" alt='story' name='story' src={Story} onClick={(event) => socialFilterHandler(event)} />
            <input type="image" alt='snapchat' name='snapchat' src={Snapchat} onClick={(event) => socialFilterHandler(event)} />
          </div>
          <Dropdown
            label='Brand'
            onChange={(value) => filterHandler('brand', value)}
            name='brand'
            options={optionsHandler('brand')}
          />
          <Dropdown
            label='Effort'
            onChange={(value) => filterHandler('effort', value)}
            name='effort'
            options={[
              <div className={classes.dropdownOption} key='Not set'>
                <div className={classes.dot} style={{ backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC' }} />
                Not set
              </div>,
              <div className={classes.dropdownOption} key='Low'>
                <div className={classes.dot} style={{ backgroundColor: '#5DC983' }} />
                Low
              </div>,
              <div className={classes.dropdownOption} key='Medium'>
                <div className={classes.dot} style={{ backgroundColor: '#FBA63C' }} />
                Medium
              </div>,
              <div className={classes.dropdownOption} key='High'>
                <div className={classes.dot} style={{ backgroundColor: '#ED6B3E' }} />
                High
              </div>,
            ]}
          />
          <Dropdown
            label='Status'
            onChange={(value) => filterHandler('status', value)}
            name='status'
            options={[
              <div className={classes.dropdownOption} key='Requested'>
                <div className={classes.dot} style={{ backgroundColor: '#D9AD42' }} />
                Requested
              </div>,
              <div className={classes.dropdownOption} key='Pre-phase'>
                <div className={classes.dot} style={{ backgroundColor: '#B14AC2' }} />
                Pre-phase
              </div>,
              <div className={classes.dropdownOption} key='Running'>
                <div className={classes.dot} style={{ backgroundColor: '#1778B0' }} />
                Running
              </div>,
              <div className={classes.dropdownOption} key='Done'>
                <div className={classes.dot} style={{ backgroundColor: '#54A880' }} />
                Done
              </div>,
            ]}
          />
          <Dropdown
            label='TL'
            onChange={(value) => filterHandler('teamLead', value)}
            name='teamLead'
            options={optionsHandler('teamLead')}
          />
          <Label label='Budget' />
          <div className={classes.budgetFilter}>
            <Input placeholder='Min' />
            <span>-</span>
            <Input placeholder='Max' />
          </div>
          <Label label='Profit' />
          <div className={classes.budgetFilter}>
            <Input placeholder='Min' />
            <span>-</span>
            <Input placeholder='Max' />
          </div>
        </div>
        <div className={classes.table}>
          {campaignsTable
            ? (
              <List
                headers={['Campaign Title', 'Brand', 'Start', 'End', 'Status', 'TL', 'Budget', 'Profit']}
                sortColumns={[1, 2, 3, 4, 7, 8]}
                requestSort={requestSort}
                map={(items || campaignsTable).map((campaign, index) => (
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
                      start: DateFormat(campaign.startDate),
                      end: DateFormat(campaign.endDate),
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
