import axios from 'axios';
import { incrementCounter, incrementTen } from './actions/giist_comments/LoadComments';

const GlobalApiNew = async (url, method = 'get', data = {}, fetchFunction) => {
  let { access_token } = JSON.parse(localStorage.getItem('@LoginData')) || '';

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    const response = await axios({
      method,
      url,
      headers,
      data,
    });
    console.log('first console');
    await fetchFunction(response);
    return;
  } catch (error) {
    console.log(error, 'eooo oooo');
  }
};
export default GlobalApiNew;
