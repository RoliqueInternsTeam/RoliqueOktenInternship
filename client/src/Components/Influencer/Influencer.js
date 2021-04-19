import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';
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

  const socialMediaHandler = (profiles) => {
    let {
      youtube, twitter, tiktok, instagram, blogger, facebook,
    } = profiles;
    const channels = [];
    if (instagram) {
      instagram = <SocialMedia platform={instagramIcon} style={['instagram']} username={instagram.username} followers={instagram.followers} />;
      channels.push(instagram);
    }
    if (tiktok) {
      tiktok = <SocialMedia platform={tiktokIcon} style={['tiktok']} username={tiktok.username} followers={tiktok.followers} />;
      channels.push(tiktok);
    }
    if (facebook) {
      facebook = <SocialMedia platform={facebookIcon} style={['facebook']} username={facebook.username} followers={facebook.followers} />;
      channels.push(facebook);
    }
    if (youtube) {
      youtube = <SocialMedia platform={youtubeIcon} style={['youtube']} username={youtube.username} followers={youtube.followers} />;
      channels.push(youtube);
    }
    if (blogger) {
      blogger = <SocialMedia platform={bloggerIcon} style={['blogger']} username={blogger.username} followers={blogger.followers} />;
      channels.push(blogger);
    }
    if (twitter) {
      twitter = <SocialMedia platform={twitterIcon} style={['twitter']} username={twitter.username} followers={twitter.followers} />;
      channels.push(twitter);
    }
    return channels.map((channel) => channel);
  };

  return (
    <div className={classes.mainContainer}>
      <Header title={`${influencer.firstName} ${influencer.lastName}`} button='edit' to='/influencer/edit' />
      <div className={classes.generalInfo}>
        {influencer.avatar
          ? <img src={influencer.avatar} alt='avatar' />
          : <Avatar name={`${influencer.firstName} ${influencer.lastName}`} round />}
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
            { influencer.socialProfiles ? socialMediaHandler(influencer.socialProfiles) : null }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Influencer;
