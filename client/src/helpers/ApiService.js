import RefreshToken from './RefreshToken';
import { setBadRequest } from '../store/actions';

export async function getAll(url, access_token) {
  let array = [];
  const request = {
    method: 'GET',
    headers: {
      AUTHORIZATION: access_token,
    },
  };
  const response = await fetch(url, request);
  if (response.status === 401) {
    await RefreshToken();
  }
  if (response.status === 200) {
    array = await response.json();
  }
  return array;
}
export async function CreateEdit(method, url, formData, access_token, dispatch, redirect) {
  const request = {
    method,
    headers: {
      AUTHORIZATION: access_token,
    },
    body: formData,
  };
  const response = await fetch(url, request);

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
