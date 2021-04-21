import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Common/Header/Header';
import classes from './Influencers.module.css';
import Search from '../Common/Search/Search';
import List from '../Common/List/List';
import TableRow from '../Common/TableRow/TableRow';
import { setInfluencer, setInfluencerList } from '../../store/actions';
import RefreshToken from '../../helpers';
import YouTube from '../Elements/Logos/youtube.svg';
import Twitter from '../Elements/Logos/twitter.svg';
import TikTok from '../Elements/Logos/tiktok.svg';
import Facebook from '../Elements/Logos/facebook.svg';
import Instagram from '../Elements/Logos/instagram.svg';
import Blogger from '../Elements/Logos/blogger.svg';
import Rating from '../Elements/Icons/rating.svg';
import Plus from '../Elements/Logos/plus-icon.svg';

const Influencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [search, setSearch] = useState('');

  const access_token = useSelector(({ access_token }) => access_token);

  const dispatch = useDispatch();
  const influencersList = useSelector(({ influencersList }) => influencersList);

  const getInfluencers = async () => {
    const request = {
      method: 'GET',
      headers: {
        AUTHORIZATION: access_token,
      },
    };
    const response = await fetch('http://localhost:5000/influencer', request);

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

  const usernameHandler = (social) => {
    const profiles = Object.keys(social);
    for (let i = 0; i < profiles.length; i++) {
      switch (profiles[i]) {
        case 'instagram':
          return social.instagram.instagramUsername;
        case 'tiktok':
          return social.tiktok.tiktokUsername;
        case 'youtube':
          return social.youtube.youtubeUsername;
        case 'facebook':
          return social.facebook.facebookUsername;
        case 'twitter':
          return social.twitter.twitterUsername;
        case 'blog':
          return social.blog.blogUsername;
        default:
          return null;
      }
    }
    return profiles;
  };

  const channelsHandler = (social) => {
    const profiles = Object.keys(social);
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

  const searchQuery = (event) => {
    setInfluencers(influencersList);
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search) {
      setInfluencers(influencers.filter((influencer) => ([usernameHandler(influencer.social), influencer.firstName, influencer.lastName].join(' ').toLowerCase().includes(search.toLowerCase()))));
    }
  }, [search]);

  return (
    <div className={classes.mainContainer}>
      <Header title='Influencers' button='createNew' />
      <Search search={searchQuery} />
      <List
        column1='Username'
        column2='Name'
        column3='Channels'
        column4='Rating'
        map={influencers.map((influencer) => (
          <TableRow
            key={influencer._id}
            avatar={influencer.avatar}
            column1={usernameHandler(influencer.social)}
            column2={`${influencer.firstName} ${influencer.lastName}`}
            column3={influencer.social ? [channelsHandler(influencer.social), <img src={Plus} alt='Add more' key={influencer._id} className={classes.channel} />] : null}
            column4={<img src={Rating} alt='rating' />}
            to='/influencer'
            tooltipMessage='Open Influencer'
            imgAlt='Open Influencer'
            onClick={() => {
              dispatch(setInfluencer(influencer));
            }}
          />
        ))}
      />

    </div>
  );
};
export default Influencers;
