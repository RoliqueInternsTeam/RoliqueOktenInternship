import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import classes from './CreateInfluencer.module.css';
import PermissionChecker from '../Common/PermissionChecker/PermissionChecker';
import { ADMIN, MANAGER } from '../../config/constants';
import Message from '../Elements/Message/Message';
import { RESTRICTED_ACCESS } from '../../config/messages';
import Header from '../Common/Header/Header';
import PictureLoader from '../Common/PictureLoader/PictureLoader';
import Input from '../Elements/Input/Input';
import RefreshToken from '../../helpers';
import { setBadRequest } from '../../store/actions';
import BirthdateInput from '../Elements/BirthdateInput/BirthdateInput';
import 'react-datepicker/src/stylesheets/datepicker.scss';

const CreateInfluencer = (props) => {
  const [influencerInfo, setInfluencerInfo] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    profession: '',
    instagram: '',
    instagramF: '',
    youtube: '',
    youtubeF: '',
    facebook: '',
    facebookF: '',
    tiktok: '',
    tiktokF: '',
    twitter: '',
    twitterF: '',
    blog: '',
    blogF: '',
    avatar: null,
  });

  useEffect(() => {
    console.log(influencerInfo);
  }, [influencerInfo]);

  const access_token = useSelector(({ access_token }) => access_token);
  const dispatch = useDispatch();

  const inputHandler = (event) => {
    setInfluencerInfo(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };

  const dateHandler = (date) => {
    setInfluencerInfo(((prevState) => ({ ...prevState, birthday: date })));
  };

  const createInfluencerHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(influencerInfo).forEach((key) => formData.append(key, influencerInfo[key]));

    const request = {
      method: 'POST',
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
      await createInfluencerHandler();
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
      <form className={classes.mainContainer} onSubmit={(event) => createInfluencerHandler(event)}>
        <Header arrow title='Create Influencer' button='saveChanges' />
        <div className={classes.body}>
          <div className={classes.leftContainer}>
            <h4 className={classes.h4}>General</h4>
            <Input label="First Name" type='text' id="firstName" required="required" onChange={(event) => inputHandler(event)} />
            <Input label="Last Name" type='text' id="lastName" required="required" onChange={(event) => inputHandler(event)} />
            <BirthdateInput setState={dateHandler} state={influencerInfo} label='Birthdate' />
            <Input label="Profession" type='text' id="profession" required="required" onChange={(event) => inputHandler(event)} />
            <PictureLoader label='Profile Picture' alt='Add an avatar' setState={setInfluencerInfo} />
          </div>
          <div className={classes.rightContainer}>
            <h4 className={classes.h4}>Social Profiles</h4>
            <div className={classes.socialProfilesContainer}>
              <div className={classes.networkContainer}>
                <Input label="Instagram" type='text' id="instagram" required={influencerInfo.instagramF ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input label="Youtube" type='text' id="youtube" required={influencerInfo.youtubeF ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input label="Facebook" type='text' id="facebook" required={influencerInfo.facebookF ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input label="TikTok" type='text' id="tiktok" required={influencerInfo.tiktokF ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input label="Twitter" type='text' id="twitter" required={influencerInfo.twitterF ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input label="Blog" type='text' id="blog" required={influencerInfo.blogF ? 'required' : null} onChange={(event) => inputHandler(event)} />
              </div>
              <div className={classes.followersContainer}>
                <Input input="masked" label="Instagram Followers" id="instagramF" required={influencerInfo.instagram ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input input="masked" label="Youtube Followers" type='number' id="youtubeF" required={influencerInfo.youtube ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input input="masked" label="Facebook Followers" type='number' id="facebookF" required={influencerInfo.facebook ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input input="masked" label="TikTok Followers" type='number' id="tiktokF" required={influencerInfo.tiktok ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input input="masked" label="Twitter Followers" type='number' id="twitterF" required={influencerInfo.twitter ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input input="masked" label="Blog Followers" type='number' id="blogF" required={influencerInfo.blog ? 'required' : null} onChange={(event) => inputHandler(event)} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </PermissionChecker>
  );
};
export default withRouter(CreateInfluencer);
