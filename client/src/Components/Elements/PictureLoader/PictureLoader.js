import React from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import classes from './PictureLoader.module.css';
import ProfilePicture from '../Icons/profile-picture.svg';
import 'antd/dist/antd.css';

const PictureLoader = (props) => {
  const onChange = (event) => {
    props.setState(((prevState) => ({ ...prevState, picture: event.file })));
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
    <div className={classes.container}>
      <label className={classes.profileLabel}>{props.label}</label>
      <ImgCrop shape='round' grid>
        <Upload
          onChange={onChange}
          onPreview={onPreview}
        >
          <img src={ProfilePicture} alt={props.alt} className={classes.profilePicture} />
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default PictureLoader;
