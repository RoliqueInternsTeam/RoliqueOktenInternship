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
import blogIcon from '../Elements/Icons/blogger-icon.svg';
import youtubeIcon from '../Elements/Icons/youtube-icon.svg';
import Label from '../Elements/Label/Label';

const Influencer = () => {
  const influencer = useSelector(({ influencer }) => influencer);

  const socialMediaHandler = (profiles) => {
    let {
      youtube, twitter, tiktok, instagram, blog, facebook,
    } = profiles;
    const channels = [];
    if (instagram) {
      instagram = <SocialMedia platform={instagramIcon} style={['instagram']} username={instagram.instagramUsername} followers={instagram.instagramFollowers} />;
      channels.push(instagram);
    }
    if (tiktok) {
      tiktok = <SocialMedia platform={tiktokIcon} style={['tiktok']} username={tiktok.tiktokUsername} followers={tiktok.tiktokFollowers} />;
      channels.push(tiktok);
    }
    if (facebook) {
      facebook = <SocialMedia platform={facebookIcon} style={['facebook']} username={facebook.facebookUsername} followers={facebook.facebookFollowers} />;
      channels.push(facebook);
    }
    if (youtube) {
      youtube = <SocialMedia platform={youtubeIcon} style={['youtube']} username={youtube.youtubeUsername} followers={youtube.youtubeFollowers} />;
      channels.push(youtube);
    }
    if (blog) {
      blog = <SocialMedia platform={blogIcon} style={['blog']} username={blog.blogUsername} followers={blog.blogFollowers} />;
      channels.push(blog);
    }
    if (twitter) {
      twitter = <SocialMedia platform={twitterIcon} style={['twitter']} username={twitter.twitterUsername} followers={twitter.twitterFollowers} />;
      channels.push(twitter);
    }
    return channels.map((channel) => channel);
  };

  return (
    <div className={classes.mainContainer}>
      <Header title={`${influencer.firstName} ${influencer.lastName}`} button='edit' to='/influencer/edit' />
      <div className={classes.generalInfo}>
        {influencer.avatar
          ? <img src={influencer.avatar} alt='avatar' className={classes.avatar} />
          : <Avatar name={`${influencer.firstName} ${influencer.lastName}`} round />}
        <div className={classes.personalInfo}>
          <h2>{`${influencer.firstName} ${influencer.lastName}`}</h2>
          <div className={classes.textContainer}>
            <Label label='Birthday:' />
            <p className={classes.p}>{influencer.birthdate}</p>
            <Label label='Occupation:' />
            <p className={classes.p}>{influencer.profession}</p>
          </div>
          <div className={classes.socialMediaContainer}>
            { influencer.social ? socialMediaHandler(influencer.social) : null }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Influencer;
