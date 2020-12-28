import axios from 'axios';

const refreshToken = (refreshToken) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  return axios
    .post(`${baseURL}api/auth/refreshToken`, { refreshToken })
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default refreshToken;
