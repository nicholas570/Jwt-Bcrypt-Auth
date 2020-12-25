import React from 'react';
import { useHistory } from 'react-router-dom';

import { Navbar, Button } from 'react-bootstrap';

function Layout({ children }) {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
    history.push('/login');
  };
  return (
    <>
      <Navbar bg='light' className='d-flex justify-content-between'>
        <Navbar.Brand>My app</Navbar.Brand>
        <Button variant='outline-primary' onClick={logout}>
          Log out
        </Button>
      </Navbar>
      {children}
    </>
  );
}

export default Layout;
