const logout = (history) => {
  localStorage.removeItem('Token');
  localStorage.removeItem('User');
  history.push('/login');
};

export default logout;
