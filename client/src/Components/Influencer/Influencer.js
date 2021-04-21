import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Common/Header/Header';
import classes from './Influencer.module.css';
import SocialMedia from '../Elements/SocialMedia/SocialMedia';
import instagramIcon from '../Elements/Icons/instagram-icon.svg';
import twitterIcon from '../Elements/Icons/twitter-icon.svg';
import facebookIcon from '../Elements/Icons/facebook-icon.svg';
import tiktokIcon from '../Elements/Icons/tiktok-icon.svg';
import bloggerIcon from '../Elements/Icons/blogger-icon.svg';
import youtubeIcon from '../Elements/Icons/youtube-icon.svg';

const Influencer = () => {
  const influencer = useSelector(({ influencer }) => influencer);

  return (
    <div className={classes.mainContainer}>
      <Header title={`${influencer.firstName} ${influencer.lastName}`} button='edit' to='/influencer/edit' />
      <div className={classes.body}>
        <div className={classes.generalInfo}>
          <img src={influencer.avatar} alt='avatar' />
          <div className={classes.personalInfo}>
            <h2>{`${influencer.firstName} ${influencer.lastName}`}</h2>
            <div className={classes.textContainer}>
              <div className={classes.stringsContainer}>
                <label className={classes.label}>Birthday:</label>
                <label className={classes.label}>Occupation:</label>
              </div>
              <div className={classes.stringsContainer}>
                <p className={classes.p}>{influencer.birthdate}</p>
                <p className={classes.p}>{influencer.profession}</p>
              </div>
            </div>
            <div className={classes.socialMediaContainer}>
              <SocialMedia
                platform={instagramIcon}
                style={['instagram']}
                username='piamuehlenbeck'
                followers='1000000'
              />
              <SocialMedia platform={tiktokIcon} style={['tiktok']} username='piamuehlenbeck' followers='1000000' />
              <SocialMedia platform={facebookIcon} style={['facebook']} username='piamuehlenbeck' followers='1000000' />
              <SocialMedia platform={twitterIcon} style={['twitter']} username='piamuehlenbeck' followers='1000000' />
              <SocialMedia platform={youtubeIcon} style={['youtube']} username='piamuehlenbeck' followers='1000000' />
              <SocialMedia platform={bloggerIcon} style={['blogger']} username='piamuehlenbeck' followers='1000000' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Influencer;
