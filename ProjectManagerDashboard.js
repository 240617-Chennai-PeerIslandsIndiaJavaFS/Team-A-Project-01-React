import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Row, Card, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateTask from '../Features/CreateTask';
import '../../styles/ProjectManagerDashboard.css';

const projects = [
  { id: 1, name: 'Project Alpha', description: 'A project to develop a new feature for our app.', manager: 'John Doe', endDate: '2024-12-31', status: 'In Progress', clients: [{ name: 'Eve Adams', email: 'eve@example.com' }] },
  { id: 2, name: 'Project Beta', description: 'Improving the user interface for the platform.', manager: 'Jane Smith', endDate: '2024-12-20', status: 'Not Started', clients: [{ name: 'Frank Turner', email: 'frank@example.com' }] },
  { id: 3, name: 'Project Gama', description: 'Improve CSS.', manager: 'John Smith', endDate: '2024-10-28', status: 'Completed', clients: [] },
  { id: 4, name: 'Project Lambda', description: 'Improving the user interface for the platform.', manager: 'Kenny', endDate: '2024-11-30', status: 'In Progress', clients: [] }
];

const teamMembers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Brown', email: 'bob@example.com' }
];

const ProjectManagerDashboard = () => {
  const [view, setView] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const handleProjectChange = (e) => {
    const projectId = parseInt(e.target.value);
    setSelectedProject(projects.find(p => p.id === projectId));
  };

  const handleRemoveTeamMember = (e) => {
    e.preventDefault();
    console.log('Removed Team Member:', selectedTeamMember);
    alert('Team Member removed!');
    setView('');
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    const updatedProjects = projects.map(project =>
      project.id === selectedProject.id ? { ...project, status: updatedStatus } : project
    );
    console.log('Updated Project Status:', updatedProjects.find(p => p.id === selectedProject.id));
    alert('Project status updated!');
    setView('');
  };

  return (
    <div className='mkbg-pm'>
      <Navbar className="custom-navbar" expand="lg">
        <Navbar.Brand href="#home">Project Manager Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='pm-left'>
            <Nav.Link as={Link} to="#" onClick={() => setView('createTask')}>Create Task</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={() => setView('removeUser')}>Remove Team Member</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={() => setView('updateProjectStatus')}>Update Project Status</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={() => setView('viewClientInfo')}>Client Information</Nav.Link>
          </Nav>
          <Nav className='pm-right'>  
            <Nav.Link as={Link} to="/support">
              <Button variant="outline-primary">Support</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <Button variant="outline-primary">Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
      {view === 'createTask' && (
          <CreateTask />
        )}
        {view === 'removeUser' && (
          <>
            <h2>Remove Team Member</h2>
            <Form onSubmit={handleRemoveTeamMember}>
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
                <Form.Group controlId="formTeamMember">
                  <Form.Label>Select Team Member to Remove</Form.Label>
                  <Form.Control as="select" onChange={e => setSelectedTeamMember(parseInt(e.target.value))}>
                    <option value="">Select a team member</option>
                    {teamMembers.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
              <Button variant="danger" type="submit">Remove Team Member</Button>
            </Form>
          </>
        )}

        {view === 'updateProjectStatus' && (
          <>
            <h2>Update Project Status</h2>
            <Form onSubmit={handleUpdateStatus}>
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
                <Form.Group controlId="formStatus">
                  <Form.Label>New Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={updatedStatus}
                    onChange={e => setUpdatedStatus(e.target.value)}
                  >
                    <option value="">Select status</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Form.Control>
                </Form.Group>
              )}
              <Button variant="primary" type="submit">Update Status</Button>
            </Form>
          </>
        )}

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

        {view === '' && (
          <Row>
            {projects.map((project, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Project Manager: {project.manager}</Card.Subtitle>
                    <Card.Text>{project.description}</Card.Text>
                    <Card.Footer className="text-muted">End Date: {project.endDate} | Status: {project.status}</Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ProjectManagerDashboard;
