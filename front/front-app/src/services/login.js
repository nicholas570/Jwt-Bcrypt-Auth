import axiosInstance from '../axios/axiosInstance';

const login = (history, state, setToken, setResult, setUserData) => {
  return axiosInstance(history)
    .post('api/auth/login', { ...state })
    .then(({ data }) => {
      setResult({ error: data.error, message: data.message });
      setUserData({
        user: data.data,
      });
      localStorage.setItem('Token', data.token);
      localStorage.setItem('RefreshToken', data.refreshToken);
      localStorage.setItem('User', JSON.stringify(data.data));
      setToken(localStorage.getItem('Token'));
      setTimeout(() => {
        history.push('/home');
      }, 1000);
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

export default login;
