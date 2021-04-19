import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setBadRequest } from '../../store/actions';
import { ADMIN, MANAGER } from '../../config/constants';
import { RESTRICTED_ACCESS } from '../../config/messages';
import PermissionChecker from '../Common/PermissionChecker/PermissionChecker';
import Message from '../Elements/Message/Message';
import Header from '../Common/Header/Header';
import Input from '../Elements/Input/Input';
import PictureLoader from '../Common/PictureLoader/PictureLoader';
import BirthdateInput from '../Elements/BirthdateInput/BirthdateInput';
import RefreshToken from '../../helpers';
import classes from './EditInfluencer.module.css';
import 'react-datepicker/src/stylesheets/datepicker.scss';

const EditInfluencer = () => {
  const influencer = useSelector(({ influencer }) => influencer);
  const [influencerInfo, setInfluencerInfo] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    profession: '',
    social: {
      instagram: {
        instagramUsername: '',
        instagramFollowers: '',
      },
      youtube: {
        youtubeUsername: '',
        youtubeFollowers: '',
      },
      facebook: {
        facebookUsername: '',
        facebookFollowers: '',
      },
      tiktok: {
        tiktokUsername: '',
        tiktokFollowers: '',
      },
      twitter: {
        twitterUsername: '',
        twitterFollowers: '',
      },
      blog: {
        blogUsername: '',
        blogFollowers: '',
      },
    },
    avatar: null,
  });

  useEffect(() => {
    setInfluencerInfo(influencer);
  }, [influencer]);

  const access_token = useSelector(({ access_token }) => access_token);
  const dispatch = useDispatch();

  const inputHandler = (setState, event) => {
    setInfluencerInfo(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };

  const inputNetworkHandler = (event) => {
    console.log(event.target.id);
    console.log(event.target.value);
    setInfluencerInfo(((prevState) => ({
      ...prevState,
      social: {
        ...prevState.social,
        [event.target.id.replace('Username', '')]: {
          ...prevState.social.name,
          [event.target.id]: event.target.value,
        },
      },
    })));
  };

  const dateHandler = (date) => {
    setInfluencerInfo(((prevState) => ({ ...prevState, birthdate: date })));
  };

  const editInfluencerHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(influencerInfo).forEach((key) => formData.append(key, influencerInfo[key]));

    const request = {
      method: 'PUT',
      headers: {
        AUTHORIZATION: access_token,
      },
      body: formData,
    };

    const response = await fetch('http://localhost:5000/influencer', request);
    if (response.status === 201) {
      props.history.push('/influencers');
    }
    if (response.status === 401) {
      await RefreshToken();
      await editInfluencerHandler();
    }
    if (response.status !== 401 && response.status !== 201) {
      dispatch(setBadRequest(true));
      setTimeout(() => dispatch(setBadRequest(false)), 3000);
    }
  };

  return (
    <PermissionChecker
      permission={[ADMIN, MANAGER]}
      display={<Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={RESTRICTED_ACCESS} redirect />}
    >
      <form className={classes.mainContainer} onSubmit={(event) => editInfluencerHandler(event)}>
        <Header arrow title='Edit Influencer' button='saveChanges' />
        <div className={classes.body}>
          <div className={classes.leftContainer}>
            <h4 className={classes.h4}>General</h4>
            <Input label="First Name" type='text' id="firstName" value={influencerInfo.firstName} onChange={(event) => inputHandler(event)} />
            <Input label="Last Name" type='text' id="lastName" value={influencerInfo.lastName} onChange={(event) => inputHandler(event)} />
            <BirthdateInput setState={dateHandler} state={influencerInfo} value={influencerInfo.birthdate} label='Birthdate' />
            <Input label="Profession" type='text' id="profession" value={influencerInfo.profession} onChange={(event) => inputHandler(event)} />
            <PictureLoader label='Profile Picture' alt='Add an avatar' value={influencerInfo.avatar} setState={setInfluencerInfo} />
          </div>
          <div className={classes.rightContainer}>
            <h4 className={classes.h4}>Social Profiles</h4>
            <div className={classes.socialProfilesContainer}>
              <div className={classes.networkContainer}>
                <Input label="Instagram" type='text' id="instagramUsername" value={influencerInfo.social.instagram && influencerInfo.social.instagram.instagramUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Youtube" type='text' id="youtubeUsername" value={influencerInfo.social.youtube && influencerInfo.social.youtube.youtubeUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Facebook" type='text' id="facebookUsername" value={influencerInfo.social.facebook && influencerInfo.social.facebook.facebookUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="TikTok" type='text' id="tiktokUsername" value={influencerInfo.social.tiktok && influencerInfo.social.tiktok.tiktokUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Twitter" type='text' id="twitterUsername" value={influencerInfo.social.twitter && influencerInfo.social.twitter.twitterUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Blog" type='text' id="blogUsername" value={influencerInfo.social.blog && influencerInfo.social.blog.blogUsername} onChange={(event) => inputNetworkHandler(event)} />
              </div>
              <div className={classes.followersContainer}>
                <Input label="Instagram Followers" type='number' id="instagramFollowers" value={influencerInfo.social.instagram && influencerInfo.social.instagram.instagramFollowers} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Youtube Followers" type='number' id="youtubeFollowers" value={influencerInfo.social.youtube && influencerInfo.social.youtube.youtubeFollowers} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Facebook Followers" type='number' id="facebookFollowers" value={influencerInfo.social.facebook && influencerInfo.social.facebook.facebookFollowers} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="TikTok Followers" type='number' id="tiktokFollowers" value={influencerInfo.social.tiktok && influencerInfo.social.tiktok.tiktokFollowers} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Twitter Followers" type='number' id="twitterFollowers" value={influencerInfo.social.twitter && influencerInfo.social.twitter.twitterFollowers} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Blog Followers" type='number' id="blogFollowers" value={influencerInfo.social.blog && influencerInfo.social.blog.blogFollowers} onChange={(event) => inputNetworkHandler(event)} />
              </div>

            </div>
          </div>
        </div>
      </form>
    </PermissionChecker>
  );
};

export default withRouter(EditInfluencer);
