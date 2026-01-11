import React, { useRef } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPrint, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from 'react-to-print';

const EmployeeTable = ({ employees, onEdit, onDelete, onToggleStatus }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const printTable = () => (
    <div style={{ display: 'none' }}>
      <div ref={componentRef}>
        <h3 className="text-center">Employee List</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.fullName}</td>
                <td>{emp.gender}</td>
                <td>{formatDate(emp.dob)}</td>
                <td>{emp.state}</td>
                <td>{emp.isActive ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {printTable()}
      
      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Profile</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>
                  <img
                    src={employee.profileImage}
                    alt={employee.fullName}
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                </td>
                <td>{employee.fullName}</td>
                <td>
                  <Badge bg={employee.gender === 'male' ? 'info' : 'warning'}>
                    {employee.gender}
                  </Badge>
                </td>
                <td>{formatDate(employee.dob)}</td>
                <td>{employee.state}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => onToggleStatus(employee.id)}
                    className="p-0"
                    title={employee.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <FontAwesomeIcon
                      icon={employee.isActive ? faToggleOn : faToggleOff}
                      className={employee.isActive ? 'text-success' : 'text-secondary'}
                      size="lg"
                    />
                  </Button>
                  <Badge bg={employee.isActive ? 'success' : 'secondary'} className="ms-2">
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEdit(employee)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDelete(employee)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={handlePrint}
                      title="Print"
                    >
                      <FontAwesomeIcon icon={faPrint} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default EmployeeTable;