import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import DashboardLayout from './components/Layout/DashboardLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Employees from './components/Employee/Employees';
import EmployeeFormPage from './components/Employee/EmployeeFormPage'; 
import PrivateRoute from './components/Auth/PrivateRoute';
import { EmployeeProvider } from './context/EmployeeContext';


function App() {
  return (
    <AuthProvider>
      <EmployeeProvider> 
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/add" element={<EmployeeFormPage />} />
            <Route path="employees/edit/:id" element={<EmployeeFormPage />} />
          </Route>
        </Routes>
      </Router>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;