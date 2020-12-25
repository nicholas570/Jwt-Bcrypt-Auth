import React from 'react';

import { Navbar, Button } from 'react-bootstrap';

function Layout({ children }) {
  return (
    <>
      <Navbar bg='light' className='d-flex justify-content-between'>
        <Navbar.Brand>My app</Navbar.Brand>
        <Button variant='outline-primary'>Log out</Button>
      </Navbar>
      {children}
    </>
  );
}

export default Layout;
