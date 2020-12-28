import axios from 'axios';

const axiosInstance = (history = null) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Token')}` || null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 403) {
        localStorage.removeItem('Token');
        localStorage.removeItem('User');
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};

export default axiosInstance;
