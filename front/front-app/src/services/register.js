import axiosInstance from '../axios/axiosInstance';

const register = (history, state, setResult, setUserData) => {
  return axiosInstance(history)
    .post('api/auth/register', { ...state })
    .then(({ data }) => {
      console.log(data);
      setResult({ error: data.error, message: data.message });
      setUserData({
        user: data.data,
        token: data.token,
        refreshToken: data.refreshToken,
      });
      localStorage.setItem('Token', data.token);
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
