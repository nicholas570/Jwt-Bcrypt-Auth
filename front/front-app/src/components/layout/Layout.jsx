import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { authContext } from '../../context/AuthProvider';

import { Navbar, Button } from 'react-bootstrap';

function Layout({ children }) {
  const { logout } = useContext(authContext);
  const history = useHistory();

  return (
    <>
      <Navbar bg='light' className='d-flex justify-content-between'>
        <Navbar.Brand>My app</Navbar.Brand>
        <Button variant='outline-primary' onClick={() => logout(history)}>
          Log out
        </Button>
      </Navbar>
      {children}
    </>
  );
}

export default Layout;
