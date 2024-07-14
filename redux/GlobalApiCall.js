import axios from 'axios';
import LoginModal from '../components/modals/loginmodal/LoginModal';
import ReactDOM from 'react-dom';

// let modalOpen = false;
// const openModal = () => {
//   if (!modalOpen) {
//     modalOpen = true;
//     const modal = document.createElement('div');
//     modal.setAttribute('id', 'modal-root');
//     document.body.appendChild(modal);
//     ReactDOM.render(<LoginModal />, modal);
//   }
// };

export const GlobalApiCall = async (url, method = 'get', data = {}, successCallBack, errorCallBack) => {
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
    successCallBack(response);
  } catch (error) {
    if (error?.response?.data?.statusCode == 401) {
      // alert('Your token has expired. Please log in again to continue.');
      // openModal();
      localStorage.removeItem('@LoginData');
      window.location.href = '/?Expire=true';
      return;
    }
    errorCallBack(error);
  }
};
