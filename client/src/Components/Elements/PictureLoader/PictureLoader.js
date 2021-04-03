import React, { useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import classes from './PictureLoader.module.css';
import ProfilePicture from '../Icons/profile-picture.svg';
// eslint-disable-next-line no-unused-vars
import { MAX_PHOTO_SIZE, PHOTO_MIMETYPES } from '../../../config/constants';
import Message from '../Message/Message';
// import { PHOTO_SIZE_EXCEED } from '../../../config/messages';

const PictureLoader = (props) => {
  const [uploaded, setUploaded] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 130,
    y: 50,
    width: 200,
    height: 200,
  });
  const imageRef = useRef(null);

  const [croppedImage, setCroppedImage] = useState(null);

  // eslint-disable-next-line no-shadow
  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // eslint-disable-next-line no-param-reassign
        blob.name = fileName;
        const croppedImageUrl = URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, 'image/jpeg', 1);
    });
  }

  const onChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUploaded(reader.result));
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // eslint-disable-next-line no-shadow
  const getImage = async (crop) => {
    const croppedImgUrl = await getCroppedImg(imageRef.current, crop, 'newfile.jpeg');
    setCroppedImage(croppedImgUrl);
  };

  const onImageLoaded = (image) => {
    imageRef.current = image;
  };

  // eslint-disable-next-line no-shadow
  const onCropComplete = (crop) => {
    getImage(crop);
  };

  // const reactCropStyle = [classes.cropper];
  // const modalWindowHandler = () => {
  //   reactCropStyle.push(classes.cropperAppear);
  // };

  return (
    <div className={classes.container}>
      <label className={classes.profileLabel} htmlFor='avatar'>{props.label}</label>
      <img src={ProfilePicture} alt={props.alt} className={classes.profilePicture} />
      <input type='file' id='avatar' accept={PHOTO_MIMETYPES} onChange={onChange} className={classes.input} />
      { error ? <Message message={error} style={['error-bg-color', 'error-icon-color', 'error-text-color']} /> : null }
      <ReactCrop
        src={uploaded}
        crop={crop}
        onChange={(crop) => setCrop(crop)}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        circularCrop
        locked
        className={classes.cropper}
        // style={{  }}
        // imageStyle={{ transform: scale(-1) }}
      />
      { croppedImage && <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImage} /> }
    </div>
  );
};

export default PictureLoader;
