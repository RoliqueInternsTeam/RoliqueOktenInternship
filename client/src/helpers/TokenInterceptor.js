import axios from 'axios';
import Cookies from 'universal-cookie';
import { store } from '../store/store';
import { setToken } from '../store/actions';

const cookies = new Cookies();
const refresh_token = cookies.get('refresh_token');

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !refresh_token) {
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (error.response.status === 401 && refresh_token) {
      const response = await axios.post('http://localhost:5000/auth/refresh', {}, {
        headers: {
          AUTHORIZATION: refresh_token,
        },
      });

      if (response.status === 200) {
        const { access_token, refresh_token } = await response.data;
        cookies.set('refresh_token', refresh_token);
        store.dispatch(setToken(access_token));
      }

      if (response.status !== 200 || response.message === 'Not token') {
        window.location.href = '/login';
      }
    }
    return axiosInstance(originalRequest);
  },
);

export default axiosInstance;
