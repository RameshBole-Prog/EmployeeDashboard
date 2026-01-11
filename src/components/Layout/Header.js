import React from 'react';
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow py-3">
      <Container fluid>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            align="end"
            title={
              <span className="text-light">
                <FontAwesomeIcon icon={faUser} className="me-1" />
                {user?.name || 'Admin'}
              </span>
            }
            id="profile-dropdown"
          >
            <NavDropdown.Item onClick={logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
