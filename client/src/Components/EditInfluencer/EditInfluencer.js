import React, { useState } from 'react';
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
  const [influencerInfo, setInfluencerInfo] = useState({ ...influencer });
  const [avatar, setAvatar] = useState(influencer.avatar);

  const access_token = useSelector(({ access_token }) => access_token);
  const dispatch = useDispatch();

  const inputHandler = (setState, event) => {
    setInfluencerInfo(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };

  const inputNetworkHandler = (event) => {
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

  const inputFollowersHandler = (event) => {
    setInfluencerInfo(((prevState) => ({
      ...prevState,
      social: {
        ...prevState.social,
        [event.target.id.replace('Followers', '')]: {
          ...prevState.social.name,
          [event.target.id]: event.target.value.replace('.', ''),
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
    formData.append('json', JSON.stringify(influencerInfo));
    formData.append('avatar', avatar);

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
            <PictureLoader label='Profile Picture' alt='Add an avatar' avatar={avatar} setState={setAvatar} />
          </div>
          <div className={classes.rightContainer}>
            <h4 className={classes.h4}>Social Profiles</h4>
            <div className={classes.socialProfilesContainer}>
              <div className={classes.networkContainer}>
                <Input label="Instagram" type='text' id="instagramUsername" required={influencerInfo.social.instagram?.instagramFollowers ? 'required' : null} value={influencerInfo.social.instagram && influencerInfo.social.instagram.instagramUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Youtube" type='text' id="youtubeUsername" required={influencerInfo.social.youtube?.youtubeFollowers ? 'required' : null} value={influencerInfo.social.youtube && influencerInfo.social.youtube.youtubeUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Facebook" type='text' id="facebookUsername" required={influencerInfo.social.facebook?.facebookFollowers ? 'required' : null} value={influencerInfo.social.facebook && influencerInfo.social.facebook.facebookUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="TikTok" type='text' id="tiktokUsername" required={influencerInfo.social.tiktok?.tiktokFollowers ? 'required' : null} value={influencerInfo.social.tiktok && influencerInfo.social.tiktok.tiktokUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Twitter" type='text' id="twitterUsername" required={influencerInfo.social.twitter?.twitterFollowers ? 'required' : null} value={influencerInfo.social.twitter && influencerInfo.social.twitter.twitterUsername} onChange={(event) => inputNetworkHandler(event)} />
                <Input label="Blog" type='text' id="blogUsername" required={influencerInfo.social.blog?.blogFollowers ? 'required' : null} value={influencerInfo.social.blog && influencerInfo.social.blog.blogUsername} onChange={(event) => inputNetworkHandler(event)} />
              </div>
              <div className={classes.followersContainer}>
                <Input input="masked" label="Instagram Followers" type='number' id="instagramFollowers" required={influencerInfo.social.instagram?.instagramUsername ? 'required' : null} value={influencerInfo.social.instagram && influencerInfo.social.instagram.instagramFollowers} onChange={(event) => inputFollowersHandler(event)} />
                <Input input="masked" label="Youtube Followers" type='number' id="youtubeFollowers" required={influencerInfo.social.youtube?.youtubeUsername ? 'required' : null} value={influencerInfo.social.youtube && influencerInfo.social.youtube.youtubeFollowers} onChange={(event) => inputFollowersHandler(event)} />
                <Input input="masked" label="Facebook Followers" type='number' id="facebookFollowers" required={influencerInfo.social.facebook?.facebookUsername ? 'required' : null} value={influencerInfo.social.facebook && influencerInfo.social.facebook.facebookFollowers} onChange={(event) => inputFollowersHandler(event)} />
                <Input input="masked" label="TikTok Followers" type='number' id="tiktokFollowers" required={influencerInfo.social.tiktok?.tiktokUsername ? 'required' : null} value={influencerInfo.social.tiktok && influencerInfo.social.tiktok.tiktokFollowers} onChange={(event) => inputFollowersHandler(event)} />
                <Input input="masked" label="Twitter Followers" type='number' id="twitterFollowers" required={influencerInfo.social.twitter?.twitterUsername ? 'required' : null} value={influencerInfo.social.twitter && influencerInfo.social.twitter.twitterFollowers} onChange={(event) => inputFollowersHandler(event)} />
                <Input input="masked" label="Blog Followers" type='number' id="blogFollowers" required={influencerInfo.social.blog?.blogUsername ? 'required' : null} value={influencerInfo.social.blog && influencerInfo.social.blog.blogFollowers} onChange={(event) => inputFollowersHandler(event)} />
              </div>

            </div>
          </div>
        </div>
      </form>
    </PermissionChecker>
  );
};

export default withRouter(EditInfluencer);
