import React, { useState } from 'react';
import TaskBoard from '../Features/TaskBoard';
import { Navbar, Nav, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/TeamMemberDashboard.css';

const projects = [
  { id: 1, name: 'Project Alpha', description: 'A project to develop a new feature for our app.', manager: 'John Doe', endDate: '2024-12-31', status: 'In Progress', clients: [{ name: 'Eve Adams', email: 'eve@example.com' }] },
  { id: 2, name: 'Project Beta', description: 'Improving the user interface for the platform.', manager: 'Jane Smith', endDate: '2024-12-20', status: 'Not Started', clients: [{ name: 'Frank Turner', email: 'frank@example.com' }] },
  { id: 3, name: 'Project Gama', description: 'Improve CSS.', manager: 'John Smith', endDate: '2024-10-28', status: 'Completed', clients: [] },
  { id: 4, name: 'Project Lambda', description: 'Improving the user interface for the platform.', manager: 'Kenny', endDate: '2024-11-30', status: 'In Progress', clients: [] }
];

const TeamMemberDashboard = () => {
  const handleProjectChange = (e) => {
    const projectId = parseInt(e.target.value);
    setSelectedProject(projects.find(p => p.id === projectId));
  };
  const [view, setView] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <div>
      <Navbar className="custom-navbar" expand="lg">
        <Navbar.Brand href="/">
          Team Member Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Nav.Link as={Link} to="#" onClick={() => setView('viewClientInfo')}>Client Information</Nav.Link>
            {/* <Nav.Link href="/projectinfo">Project Info</Nav.Link> */}
            <Nav.Link as={Link} to="/support">
              <Button className="btn-custom" variant="outline-light">Support</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <Button className="btn-custom" variant="outline-light">Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-4">
      {view === 'viewClientInfo' && (
          <>
            <h2>Client Information</h2>
            <Form.Group controlId="formProject">
              <Form.Label>Select Project</Form.Label>
              <Form.Control as="select" onChange={handleProjectChange}>
                <option value="">Select a project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedProject && (
              <div>
                <h3>Clients for {selectedProject.name}</h3>
                {selectedProject.clients.length > 0 ? (
                  <ul>
                    {selectedProject.clients.map((client, index) => (
                      <li key={index}>{client.name} - {client.email}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No clients assigned to this project.</p>
                )}
              </div>
            )}
          </>
        )}
      </Container>
      <TaskBoard />
    </div>
  );
};

export default TeamMemberDashboard;
