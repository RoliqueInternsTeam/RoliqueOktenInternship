import React, { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { withRouter } from 'react-router';
import classes from './CreateInternalUser.module.css';
import Arrow from '../Elements/Icons/arrow.svg';
import Info from '../Elements/Icons/info.svg';
import ProfilePicture from '../Elements/Icons/profile-picture.svg';
import Input from '../Elements/Input/Input';
import Dropdown from '../Elements/Dropdown/Dropdown';
import Tooltip from '../Elements/Tooltip/Tooltip';
import { ROLES_INFO } from '../../config/messages';
import { PHONE_NUMBER } from '../../config/regexp.enum';
import 'antd/dist/antd.css';

const CreateInternalUser = (props) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    picture: null,
  });

  useEffect(() => { console.log(userInfo); }, [userInfo]);
  const onChange = ({ fileList: newFileList }) => {
    setUserInfo((prevState) => ({ ...prevState, picture: newFileList }));
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <form className={classes.mainContainer}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <img src={Arrow} alt='Arrow button' className={classes.arrow} onClick={() => props.history.goBack()} />
          <h1>Create Internal User</h1>
        </div>
        <button type='submit' className={classes.button}>Save changes</button>
      </div>
      <div className={classes.body}>
        <div className={classes.leftContainer}>
          <h4 className={classes.h4}>General</h4>
          <p className={classes.profileLabel}>Profile Picture</p>
          <ImgCrop shape='round' grid>
            <Upload
              fileList={userInfo.picture}
              onChange={onChange}
              onPreview={onPreview}
              className={classes.upload}
            >
              <img src={ProfilePicture} alt='Add a profile avatar' className={classes.profilePicture} />
            </Upload>
          </ImgCrop>
          <Input label="First Name" type='text' id="firstName" required="required" />
          <Input label="Last Name" type='text' id="lastName" required="required" />
          <Input label="Email" type='email' id="email" required="required" />
          <Input label="Phone" type='tel' id="phone" pattern={PHONE_NUMBER} />
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.rolesInfo}>
            <h4 className={classes.h4}>Roles & Permissions</h4>
            <img src={Info} alt='info' className={classes.info} />
            <div className={classes.tooltipHider}>
              <Tooltip color='dark' arrowPlace='top' align='center' message={ROLES_INFO} />
            </div>
          </div>
          <Dropdown label="Role" name="roles" options={['Admin', 'Manager', 'Employee']} required="required" />
          <div className={classes.passwordContainer}>
            <h4 className={classes.h4}>Password</h4>
            <Input label="Set Password" type='password' id="password" required="required" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default withRouter(CreateInternalUser);
