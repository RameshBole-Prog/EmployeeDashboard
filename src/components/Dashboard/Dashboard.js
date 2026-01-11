import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserCheck, faUserClock } from '@fortawesome/free-solid-svg-icons';
import { mockEmployees } from '../../utils/mockData';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1000);
  }, []);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.isActive).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  const summaryCards = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: faUsers,
      color: 'primary',
      description: 'All employees in the system'
    },
    {
      title: 'Active Employees',
      value: activeEmployees,
      icon: faUserCheck,
      color: 'success',
      description: 'Currently active employees'
    },
    {
      title: 'Inactive Employees',
      value: inactiveEmployees,
      icon: faUserClock,
      color: 'warning',
      description: 'Employees not currently active'
    }
  ];

  if (loading) {
    return (
      <Container>
        <h3 className="mb-4">Dashboard Overview</h3>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h3 className="mb-4">Dashboard Overview</h3>
      <Row className="g-4">
        {summaryCards.map((card, index) => (
          <Col key={index} lg={4} md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className={`rounded-circle p-3 bg-${card.color}-subtle me-3`}>
                    <FontAwesomeIcon 
                      icon={card.icon} 
                      className={`text-${card.color}`} 
                      size="lg"
                    />
                  </div>
                  <div>
                    <h6 className="text-muted mb-1">{card.title}</h6>
                    <h2 className={`text-${card.color} mb-0`}>{card.value}</h2>
                  </div>
                </div>
                <p className="text-muted mb-0">{card.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;