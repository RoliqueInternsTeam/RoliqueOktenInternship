import Cookies from 'universal-cookie';
<<<<<<< HEAD
// import { useDispatch } from 'react-redux';
import { TOKEN } from '../store/actionTypes';
=======
import { store } from '../store/store';
import { setToken } from '../store/actions';
>>>>>>> develop

const cookies = new Cookies();

const RefreshToken = async () => {
<<<<<<< HEAD
  // const dispatch = useDispatch();
=======
>>>>>>> develop
  const refresh_token = cookies.get('refresh_token');
  const refreshResponse = await fetch('http://localhost:5000/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      AUTHORIZATION: refresh_token,
    },
  });
  if (refreshResponse.status === 200) {
    const { access_token, refresh_token } = await refreshResponse.json();
    cookies.set('refresh_token', refresh_token);
    store.dispatch(setToken(access_token));
  }
  if (refreshResponse.status === 400 || refreshResponse.status === 401) {
    window.location.href = '/login';
  }
};

export default RefreshToken;
