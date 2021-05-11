import axios from 'axios';
import RefreshToken from './RefreshToken';
import { setBadRequest } from '../store/actions';

export async function getAll(url, access_token) {
  let array = [];

  const auth = {
    headers: {
      AUTHORIZATION: access_token,
    },
  };

  const response = await axios.get(url, auth);

  if (response.status === 401) {
    await RefreshToken();
  }

  if (response.status === 200) {
    array = await response.data;
  }

  return array;
}

export async function getOne(url, access_token) {
  let foundObject = {};

  const auth = {
    headers: {
      AUTHORIZATION: access_token,
    },
  };

  const response = await axios.get(url, auth);

  if (response.status === 401) {
    await RefreshToken();
  }

  if (response.status === 200) {
    foundObject = await response.data;
  }

  return foundObject;
}

export async function Create(url, formData, access_token, dispatch, redirect) {
  const auth = {
    headers: {
      AUTHORIZATION: access_token,
    },
  };

  const response = await axios.post(url, formData, auth);

  if (response.status === 401) {
    await RefreshToken();
  }

  if (response.status !== 401 && response.status !== 201) {
    dispatch(setBadRequest(true));
    setTimeout(() => dispatch(setBadRequest(false)), 3000);
  }

  if (response.status === 201) {
    return setTimeout(() => redirect, 500);
  }
}

export async function Edit(url, formData, access_token, dispatch) {
  const auth = {
    headers: {
      AUTHORIZATION: access_token,
    },
  };

  const response = await axios.put(url, formData, auth);

  if (response.status === 401) {
    await RefreshToken();
  }

  if (response.status !== 401 && response.status !== 200) {
    dispatch(setBadRequest(true));
    setTimeout(() => dispatch(setBadRequest(false)), 3000);
  }

  if (response.status === 200) {
    return response.status;
  }
}
