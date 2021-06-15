import React, { useEffect, useState } from 'react';
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
import { getOne } from '../../helpers/ApiService';
import Loading from '../Elements/Loading/Loading';
import DateFormat from '../../helpers/DateFormat';

const Influencer = (props) => {
  const access_token = useSelector(({ access_token }) => access_token);
  const [influencerInfo, setInfluencerInfo] = useState(null);

  const fetchHandler = () => {
    const path = props.history.location.pathname.split('/');
    const id = path[2];
    getOne(`http://localhost:5000/influencer/${id}`, access_token)
      .then((res) => setInfluencerInfo(res));
  };

  useEffect(() => fetchHandler(), []);

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
    influencerInfo ? (
      <div className={classes.mainContainer}>
        <Header title={`${influencerInfo.firstName} ${influencerInfo.lastName}`} button='edit' to={`/influencer/edit/${influencerInfo._id}`} />
        <div className={classes.generalInfo}>
          {influencerInfo.avatar
            ? <img src={influencerInfo.avatar} alt='avatar' className={classes.avatar} />
            : <Avatar name={`${influencerInfo.firstName} ${influencerInfo.lastName}`} round />}
          <div className={classes.personalInfo}>
            <h2>{`${influencerInfo.firstName} ${influencerInfo.lastName}`}</h2>
            <div className={classes.textContainer}>
              <Label label='Birthday:' />
              <p className={classes.p}>{DateFormat(influencerInfo.birthdate)}</p>
              <Label label='Occupation:' />
              <p className={classes.p}>{influencerInfo.profession}</p>
            </div>
            <div className={classes.socialMediaContainer}>
              { influencerInfo.social ? socialMediaHandler(influencerInfo.social) : null }
            </div>
          </div>
        </div>
        <div className={classes.photosContainer}>
          { influencerInfo.social?.instagram?.instagramPhotos.map((photo) => <img src={photo.photoURL} alt='Instagram content' key={photo._id} className={classes.instagramPhoto} />) }
        </div>
      </div>
    ) : <Loading class='onBlankPage' />
  );
};

export default Influencer;
