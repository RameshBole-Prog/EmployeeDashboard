import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockEmployees } from '../utils/mockData';

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 800);
  }, []);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: employees.length + 1,
      profileImage: employee.profileImage || 'https://via.placeholder.com/50'
    };
    setEmployees(prev => [...prev, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === id ? { ...emp, ...updatedData } : emp
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const toggleStatus = (id) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
      )
    );
  };

  const value = {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    toggleStatus
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};