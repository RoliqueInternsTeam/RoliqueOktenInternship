import React, { useState } from 'react';
import { serialize } from 'object-to-formdata';
import { useDispatch, useSelector } from 'react-redux';
import ScrollLock from 'react-scrolllock';
import PropTypes from 'prop-types';
import classes from './CreateBrand.module.css';
import Input from '../Elements/Input/Input';
import PictureLoader from '../Common/PictureLoader/PictureLoader';
import { Create } from '../../helpers/ApiService';

function CreateBrand(props) {
  const [brand, setBrand] = useState({
    name: '',
    avatar: null,
  });

  const access_token = useSelector(({ access_token }) => access_token);
  const dispatch = useDispatch();

  const inputHandler = (event) => {
    setBrand(((prevState) => ({ ...prevState, [event.target.id]: event.target.value })));
  };

  const cancelHandler = (event) => {
    event.preventDefault();

    setBrand(null);
    props.setState(false);
  };

  const createHandler = async (event) => {
    event.preventDefault();

    const formData = serialize(
      brand,
    );

    const status = await Create('http://localhost:5000/campaigns/brand', formData, access_token, dispatch);
    status === 201 ? props.setState(false) : null;
  };

  return (
    <form className={classes.background} onSubmit={(event) => createHandler(event)}>
      <div className={classes.window}>
        <div className={classes.container}>
          <h3 className={classes.title}>Add new Brand</h3>
          <Input
            onChange={(event) => inputHandler(event)}
            label="Name"
            htmlFor='name'
            type='name'
            id="name"
            className='longInput'
            required
          />
          <PictureLoader label="Logo" setState={setBrand} alt="logo" />
          <div className={classes.buttonsContainer}>
            <button type='submit' className={classes.submitButton}>Create Brand</button>
            <button type='button' className={classes.cancelButton} onClick={(event) => cancelHandler(event)}>Cancel</button>
          </div>
        </div>
      </div>
      <ScrollLock isActive />
    </form>
  );
}

CreateBrand.propTypes = {
  setState: PropTypes.func.isRequired,
};

export default CreateBrand;
