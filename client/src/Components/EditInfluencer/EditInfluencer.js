import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import classes from './EditInfluencer.module.css';
import PermissionChecker from '../Common/PermissionChecker/PermissionChecker';
import Message from '../Elements/Message/Message';
import { ADMIN, MANAGER } from '../../config/constants';
import Header from '../Common/Header/Header';
import Input from '../Elements/Input/Input';
import PictureLoader from '../Common/PictureLoader/PictureLoader';
// import RefreshToken from '../../helpers';
// import { setBadRequest } from '../../store/actions';
import { RESTRICTED_ACCESS } from '../../config/messages';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import BirthdateInput from '../Elements/BirthdateInput/BirthdateInput';
import RefreshToken from '../../helpers';
import { setBadRequest } from '../../store/actions';

const EditInfluencer = () => {
  const influencer = useSelector(({ influencer }) => influencer);
  const [influencerInfo, setInfluencerInfo] = useState({
    ...influencer,
  });
  const [socialProfiles, setSocialProfiles] = useState({});

  useEffect(() => {
    setSocialProfiles(influencerInfo.socialProfiles);
  }, [influencerInfo]);
  // useEffect(() => {
  //   console.log(socialProfiles);
  //   console.log(influencerInfo);
  // }, [influencerInfo]);

  // eslint-disable-next-line no-unused-vars
  const access_token = useSelector(({ access_token }) => access_token);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  const inputHandler = (setState, event) => {
    console.log([event.target.id]);
    console.log(event.target.value);
    setState(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };
  const dateHandler = (date) => {
    setInfluencerInfo(((prevState) => ({ ...prevState, birthday: date })));
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
    //
    const response = await fetch('http://localhost:5000/influencer', request);
    if (response.status === 201) {
      props.history.push('/influencer');
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
            <Input label="First Name" type='text' id="firstName" value={influencerInfo.firstName} onChange={(event) => inputHandler(setInfluencerInfo, event)} />
            <Input label="Last Name" type='text' id="lastName" value={influencerInfo.lastName} onChange={(event) => inputHandler(setInfluencerInfo, event)} />
            <BirthdateInput setState={dateHandler} state={influencerInfo} value={influencerInfo.birthdate} label='Birthdate' />
            <Input label="Profession" type='text' id="profession" value={influencerInfo.profession} onChange={(event) => inputHandler(setInfluencerInfo, event)} />
            <PictureLoader label='Profile Picture' alt='Add an avatar' value={influencerInfo.avatar} setState={setInfluencerInfo} />
          </div>
          <div className={classes.rightContainer}>
            <h4 className={classes.h4}>Social Profiles</h4>
            <div className={classes.socialProfilesContainer}>
              <div className={classes.networkContainer}>
                <Input label="Instagram" type='text' id="instagram" value={socialProfiles.instagram ? socialProfiles.instagram.username : null} required={influencerInfo.instagramF ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="Youtube" type='text' id="youtube" value={socialProfiles.youtube ? socialProfiles.youtube.username : null} required={influencerInfo.youtubeF ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="Facebook" type='text' id="facebook" value={socialProfiles.facebook ? socialProfiles.facebook.username : null} required={influencerInfo.facebookF ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="TikTok" type='text' id="tiktok" value={socialProfiles.tiktok ? socialProfiles.tiktok.username : null} required={influencerInfo.tiktokF ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="Twitter" type='text' id="twitter" value={socialProfiles.twitter ? socialProfiles.twitter.username : null} required={influencerInfo.twitterF ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="Blog" type='text' id="blog" value={socialProfiles.blog ? socialProfiles.blog.username : null} required={influencerInfo.blogF ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
              </div>
              <div className={classes.followersContainer}>
                <Input label="Instagram Followers" type='number' id="instagramF" value={socialProfiles.instagram ? socialProfiles.instagram.followers : null} required={influencerInfo.instagram ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="Youtube Followers" type='number' id="youtubeF" value={socialProfiles.youtube ? socialProfiles.youtube.followers : null} required={influencerInfo.youtube ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="Facebook Followers" type='number' id="facebookF" value={socialProfiles.facebook ? socialProfiles.facebook.followers : null} required={influencerInfo.facebook ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="TikTok Followers" type='number' id="tiktokF" value={socialProfiles.tiktok ? socialProfiles.tiktok.followers : null} required={influencerInfo.tiktok ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="Twitter Followers" type='number' id="twitterF" value={socialProfiles.twitter ? socialProfiles.twitter.followers : null} required={influencerInfo.twitter ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
                <Input label="Blog Followers" type='number' id="blogF" value={socialProfiles.blog ? socialProfiles.blog.followers : null} required={influencerInfo.blog ? 'required' : null} onChange={(event) => inputHandler(setSocialProfiles, event)} />
              </div>

            </div>
          </div>
        </div>
      </form>
    </PermissionChecker>
  );
};

export default withRouter(EditInfluencer);
