import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import classes from './CreateInfluencer.module.css';
import PermissionChecker from '../Elements/PermissionChecker/PermissionChecker';
import { ADMIN, MANAGER } from '../../config/constants';
import Message from '../Elements/Message/Message';
import { RESTRICTED_ACCESS } from '../../config/messages';
import Header from '../Elements/Header/Header';
import PictureLoader from '../Elements/PictureLoader/PictureLoader';
import Input from '../Elements/Input/Input';
import RefreshToken from '../../helpers';
import { setBadRequest } from '../../store/actions';
import 'react-day-picker/lib/style.css';

const CreateInfluencer = (props) => {
  const [influencerInfo, setInfluencerInfo] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    profession: '',
    instagram: '',
    instagramF: '',
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

  const dayChangeHandler = (selectedDay) => {
    setInfluencerInfo(((prevState) => ({ ...prevState, birthday: selectedDay })));
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

    const response = await fetch('http://localhost:5000/user', request);
    if (response.status === 201) {
      props.history.push('/users');
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
            <DayPickerInput
              component={(props) => <Input label="Birthday" type='text' id="birthday" onChange={(event) => inputHandler(event)} {...props} />}
              hideOnDayClick
              placeholder=''
              onDayChange={dayChangeHandler}
              // dayPickerProps={{
              //
              //   month: new Date(2018, 10),
              //   showWeekNumbers: true,
              //   todayButton: 'Today',
              // }}
            />
            <Input label="Birthday" type='date' id="birthday" onChange={(event) => inputHandler(event)} />
            <Input label="Profession" type='text' id="profession" required="required" onChange={(event) => inputHandler(event)} />
            <PictureLoader label='Profile Picture' alt='Add an avatar' setState={setInfluencerInfo} />
          </div>
          <div className={classes.rightContainer}>
            <h4 className={classes.h4}>Social Profiles</h4>
            <div className={classes.socialProfilesContainer}>
              <div className={classes.networkContainer}>
                <Input label="Instagram" type='text' id="instagram" required={influencerInfo.instagramF ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input label="Youtube" type='text' id="youtube" required={influencerInfo.youtubeF ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input label="Facebook" type='text' id="facebook" required="required" onChange={(event) => inputHandler(event)} />
                <Input label="TikTok" type='text' id="tiktok" required="required" onChange={(event) => inputHandler(event)} />
                <Input label="Twitter" type='text' id="twitter" required="required" onChange={(event) => inputHandler(event)} />
                <Input label="Blog" type='text' id="blog" required="required" onChange={(event) => inputHandler(event)} />
              </div>
              <div className={classes.followersContainer}>
                <Input label="Instagram Followers" type='number' id="instagramF" required={influencerInfo.instagram ? 'required' : null} onChange={(event) => inputHandler(event)} />
                <Input label="Youtube Followers" type='number' id="youtubeF" required="required" onChange={(event) => inputHandler(event)} />
                <Input label="Facebook Followers" type='number' id="facebookF" required="required" onChange={(event) => inputHandler(event)} />
                <Input label="TikTok Followers" type='number' id="tiktokF" required="required" onChange={(event) => inputHandler(event)} />
                <Input label="Twitter Followers" type='number' id="twitterF" required="required" onChange={(event) => inputHandler(event)} />
                <Input label="Blog Followers" type='number' id="blogF" required="required" onChange={(event) => inputHandler(event)} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </PermissionChecker>
  );
};
export default withRouter(CreateInfluencer);
