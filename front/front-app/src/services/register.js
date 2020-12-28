import axiosInstance from '../axios/axiosInstance';

const register = (history, state, setToken, setResult, setUserData) => {
  return axiosInstance(history)
    .post('api/auth/register', { ...state })
    .then(({ data }) => {
      setResult({ error: data.error, message: data.message });
      setUserData({
        user: data.data,
      });
      localStorage.setItem('Token', data.token);
      localStorage.setItem('RefreshToken', data.refreshToken);
      setToken(data.token);
      localStorage.setItem('User', JSON.stringify(data.data));
      history.push('/home');
    })
    .catch((err) => {
      if (err.response === undefined) {
        setResult({
          message: 'Something went wrong',
          error: '',
        });
      } else {
        setResult({
          message: err.response.data.message,
          error: err.response.data.error,
        });
      }
    });
};

export default register;
