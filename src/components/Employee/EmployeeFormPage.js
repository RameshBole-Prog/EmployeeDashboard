import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import { useEmployees } from '../../context/EmployeeContext'; 

const EmployeeFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { addEmployee, updateEmployee } = useEmployees(); 
  
  const employee = location.state?.employee || null;
  const isEditMode = !!id;

  const handleSubmit = (employeeData) => {
    if (isEditMode && employee) {
      updateEmployee(employee.id, employeeData);
    } else {
      addEmployee(employeeData);
    }
    navigate('/employees');
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Button 
            variant="outline-secondary" 
            onClick={handleCancel}
            className="me-3"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back
          </Button>
          <h3 className="d-inline-block mb-0">
            {isEditMode ? 'Edit Employee' : 'Add New Employee'}
          </h3>
        </div>
      </div>

      <Card className="shadow">
        <Card.Body className="p-4">
          <EmployeeForm
            employee={employee}
            onSubmit={handleSubmit}
            isEditMode={isEditMode}
            onCancel={handleCancel}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeFormPage;