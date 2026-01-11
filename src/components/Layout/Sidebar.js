import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="bg-dark text-light" style={{ width: '220px', minHeight: '100vh' }}>
      <div className="p-4">
        <h4 className="text-center mb-4">Admin Panel</h4>
        <Nav className="flex-column">
          <Nav.Link 
            as={NavLink} 
            to="/dashboard" 
            end
            className={({ isActive }) => 
              `text-light mb-2 ${isActive ? 'active bg-primary rounded' : ''}`
            }
          >
            <FontAwesomeIcon icon={faChartBar} className="me-2" />
            Dashboard
          </Nav.Link>
          <Nav.Link 
            as={NavLink} 
            to="/employees"
            className={({ isActive }) => 
              `text-light mb-2 ${isActive ? 'active bg-primary rounded' : ''}`
            }
          >
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            Employees
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;