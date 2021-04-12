import Cookies from 'universal-cookie';
// import { useDispatch } from 'react-redux';
import { TOKEN } from '../store/actionTypes';

const cookies = new Cookies();

const setToken = (payload) => ({ type: TOKEN, payload });

const RefreshToken = async () => {
  // const dispatch = useDispatch();
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

export default RefreshToken;
