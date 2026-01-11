import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const EmployeeSearch = ({ 
  searchTerm = '', 
  onSearchChange = () => {}, 
  filters = { gender: '', status: '' }, 
  onFilterChange = () => {} 
}) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Search by Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee name..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Gender</Form.Label>
              <Form.Select
                value={filters.gender || ''}
                onChange={(e) => onFilterChange({ ...filters, gender: e.target.value })}
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Status</Form.Label>
              <Form.Select
                value={filters.status || ''}
                onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EmployeeSearch;