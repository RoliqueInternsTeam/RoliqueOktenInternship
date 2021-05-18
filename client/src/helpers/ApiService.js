import axios from 'axios';
import axiosInstance from './TokenInterceptor';
import { setBadRequest } from '../store/actions';

export async function getAll(url, access_token) {
  try {
    let array = [];

    const auth = {
      headers: {
        AUTHORIZATION: access_token,
      },
    };

    const response = await axiosInstance.get(url, auth);

    if (response.status === 200) {
      array = await response.data;
    }

    return array;
  } catch (e) {
    return console.log(e);
  }
}

export async function getOne(url, access_token) {
  try {
    let foundObject = {};

    const auth = {
      headers: {
        AUTHORIZATION: access_token,
      },
    };

    const response = await axiosInstance.get(url, auth);

    if (response.status === 200) {
      foundObject = await response.data;
    }

    return foundObject;
  } catch (e) {
    return console.log(e);
  }
}

export async function Create(url, formData, access_token, dispatch) {
  try {
    const auth = {
      headers: {
        AUTHORIZATION: access_token,
      },
    };

    const response = await axiosInstance.post(url, formData, auth);

    if (response.status === 201) {
      return response.status;
    }
  } catch (e) {
    dispatch(setBadRequest(true));
    return setTimeout(() => dispatch(setBadRequest(false)), 3000);
  }
}

export async function Edit(url, formData, access_token, dispatch) {
  try {
    const auth = {
      headers: {
        AUTHORIZATION: access_token,
      },
    };

    const response = await axiosInstance.put(url, formData, auth);

    if (response.status === 200) {
      return response.status;
    }
  } catch (e) {
    dispatch(setBadRequest(true));
    return setTimeout(() => dispatch(setBadRequest(false)), 3000);
  }
}

export async function Logout(access_token) {
  try {
    const response = await axios.delete('http://localhost:5000/auth/logout', {
      headers: {
        AUTHORIZATION: access_token,
      },
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}
