import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import '../../styles/ClientDashboard.css';

const mockClientData = {
  username: 'john_doe',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  projects: [
    { id: 1, name: 'Project Alpha' },
    { id: 2, name: 'Project Beta' }
  ]
};

const ClientDashboard = () => {
  const [clientData, setClientData] = useState(null);
  // Simulate fetching data
  useEffect(() => {
    // Replace this with actual data fetching logic
    setClientData(mockClientData);
  }, []);

  if (!clientData) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <h1>Client Dashboard</h1>
      <Card>
        <Card.Header>
          <h2>{clientData.username}'s Profile</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Username:</strong> {clientData.username}</ListGroup.Item>
                <ListGroup.Item><strong>Email:</strong> {clientData.email}</ListGroup.Item>
                <ListGroup.Item><strong>First Name:</strong> {clientData.firstName}</ListGroup.Item>
                <ListGroup.Item><strong>Last Name:</strong> {clientData.lastName}</ListGroup.Item>
                <ListGroup.Item><strong>Date of Birth:</strong> {clientData.dateOfBirth}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <h4>Assigned Projects</h4>
              <ListGroup>
                {clientData.projects.map(project => (
                  <ListGroup.Item key={project.id}>{project.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
        <Nav.Link as={Link} to="/support">
            <Button variant="outline-primary">Support</Button>
        </Nav.Link>
        <br></br>
        <Nav.Link as={Link} to="/">
            <Button variant="outline-primary">logout</Button>
            </Nav.Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ClientDashboard;
