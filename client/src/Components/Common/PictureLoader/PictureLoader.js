import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Resizer from 'react-image-file-resizer';
import classes from './PictureLoader.module.css';
import ProfilePicture from '../../Elements/Icons/profile-picture.svg';
import { MAX_PHOTO_SIZE, PHOTO_MIMETYPES } from '../../../config/constants';
import { PHOTO_SIZE_EXCEED } from '../../../config/messages';
import Message from '../../Elements/Message/Message';

const PictureLoader = (props) => {
  const [uploaded, setUploaded] = useState(null);
  const [error, setError] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 130,
    y: 50,
    width: 200,
    height: 200,
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const imageRef = useRef(null);

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

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        // eslint-disable-next-line no-param-reassign
        blob.name = fileName;
        setCroppedImage(blob);
        const ImageUrl = URL.createObjectURL(blob);
        resolve(ImageUrl);
      }, 'image/jpeg', 1);
    });
  }

  const resizeFile = (file) => new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      700,
      600,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
    );
  });

  const blobToFile = (blob, fileName) => new File([blob], fileName, { lastModified: new Date().getTime(), type: blob.type });

  const onChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > MAX_PHOTO_SIZE) {
        setError(PHOTO_SIZE_EXCEED);
      }
      if (file.size < MAX_PHOTO_SIZE) {
        setError(null);
        const image = await resizeFile(file);
        setUploaded(image);
        event.target.value = '';
      }
    }
  };

  const getImage = async (crop) => {
    const croppedImgUrl = await getCroppedImg(imageRef.current, crop, 'newfile.jpeg');
    setCroppedImageUrl(croppedImgUrl);
  };

  const onImageLoaded = async (image) => {
    imageRef.current = image;
  };

  const onCropComplete = (crop) => {
    getImage(crop);
  };

  const submitHandler = () => {
    const file = blobToFile(croppedImage, 'avatar.jpeg');
    props.setState(((prevState) => ({ ...prevState, avatar: file })));
    setNewProfilePicture(croppedImageUrl);
    setUploaded(null);
  };
  const cancelHandler = () => {
    setUploaded(null);
  };

  return (
    <div className={classes.container}>
      <label className={classes.profileLabel} htmlFor='avatar'>{props.label}</label>
      <div>
        <input type='file' id='avatar' accept={PHOTO_MIMETYPES} onChange={onChange} className={classes.input} />
        { newProfilePicture
          ? <img src={newProfilePicture} alt='Your avatar' className={classes.newProfilePicture} />
          : <img src={props.avatar ? props.avatar : ProfilePicture} alt={props.alt} className={classes.profilePicture} /> }
      </div>

      {error ? <Message message={error} style={['error-bg-color', 'error-icon-color', 'error-text-color']} /> : null}
      <div className={uploaded ? classes.cropper : classes.hideCropper}>
        <ReactCrop
          src={uploaded}
          crop={crop}
          onChange={(crop) => setCrop(crop)}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          circularCrop
          locked
          className={classes.imageOnCrop}
        />
        <div className={classes.buttonsContainer}>
          <button type='button' className={classes.cancelButton} onClick={cancelHandler}>Cancel</button>
          <button type='button' className={classes.submitButton} onClick={submitHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

PictureLoader.propTypes = {
  label: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  setState: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};

PictureLoader.defaultProps = {
  avatar: '',
};

export default PictureLoader;
