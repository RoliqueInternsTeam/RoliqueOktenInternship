import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { TOKEN } from '../store/actions';

const cookies = new Cookies();

// eslint-disable-next-line react-hooks/rules-of-hooks
const dispatch = useDispatch();

const setToken = (payload) => ({ type: TOKEN, payload });

const refreshToken = async () => {
  const refresh_token = cookies.get('refresh_token');
  const refreshResponse = await fetch('http://localhost:5000/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(refresh_token),
  });
  if (refreshResponse.status === 200) {
    const { access_token } = await refreshResponse.json();
    dispatch(setToken(access_token));
  }
};

export default refreshToken;
