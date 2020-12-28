import axiosInstance from '../axios/axiosInstance';

const accessPrivateRoutes = (history, token, setIsValid) => {
  return axiosInstance(history)
    .post('api/auth/authenticateToken', { token })
    .then(({ data }) => {
      setIsValid(data);
    })
    .catch((err) => setIsValid(err.response));
};

export default accessPrivateRoutes;
