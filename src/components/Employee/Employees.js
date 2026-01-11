import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';
import EmployeeSearch from './EmployeeSearch';
import { useEmployees } from '../../context/EmployeeContext';

const Employees = () => {
  const { employees, loading, deleteEmployee, toggleStatus } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    status: ''
  });
  
  // States for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/employees/add');
  };

  const handleEdit = (employee) => {
    console.log('Editing employee:', employee);
    console.log('Employee keys:', Object.keys(employee));
    navigate(`/employees/edit/${employee.id}`, { state: { employee } });
};

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      setDeleteLoading(true);
      setTimeout(() => {
        deleteEmployee(employeeToDelete.id);
        setDeleteLoading(false);
        setShowDeleteModal(false);
        setEmployeeToDelete(null);
      }, 500);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = !filters.gender || employee.gender === filters.gender;
    const matchesStatus = !filters.status || 
      (filters.status === 'active' ? employee.isActive : !employee.isActive);
    
    return matchesSearch && matchesGender && matchesStatus;
  });

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Employee Management</h3>
        <Button variant="primary" onClick={handleAdd}>
          + Add New Employee
        </Button>
      </div>

      <EmployeeSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onToggleStatus={toggleStatus}
          />
          
          {filteredEmployees.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No employees found. Add your first employee!</p>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal - Plain Design */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">        
            <h5 className="mb-3">Are you sure?</h5>
            
            <p className="mb-2">
              You want to delete the employee
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={cancelDelete}
            disabled={deleteLoading}
            className="px-4"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmDelete}
            disabled={deleteLoading}
            className="px-4"
          >
            {deleteLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Deleting...
              </>
            ) : (
              'Delete Employee'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Employees;