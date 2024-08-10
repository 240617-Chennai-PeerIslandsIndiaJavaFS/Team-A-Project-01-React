import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import CreateProject from '../Features/CreateProject';
import CreateTask from '../Features/CreateTask';
import { Link } from 'react-router-dom';
import '../../styles/AdminDashboard.css';

const initialProjects = [
  { id: 1, name: 'Project Alpha', description: 'Develop a new feature.', manager: 'John Doe', endDate: '2024-12-31' },
  { id: 2, name: 'Project Beta', description: 'UI improvements.', manager: 'Jane Smith', endDate: '2024-11-30' },
];

const users = {
  teamMembers: [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Bob Brown', email: 'bob@example.com', phone: '234-567-8901' },
  ],
  projectManagers: [
    { id: 1, name: 'Charlie Davis', email: 'charlie@example.com', phone: '345-678-9012' },
    { id: 2, name: 'Dana Lee', email: 'dana@example.com', phone: '456-789-0123' },
  ],
  clients: [
    { id: 1, name: 'Eve Adams', email: 'eve@example.com', phone: '567-890-1234' },
    { id: 2, name: 'Frank Turner', email: 'frank@example.com', phone: '678-901-2345' },
  ]
};

const AdminDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState({});
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: ''
  });

  const handleAssignUsersClick = () => setView('assignUsers');
  const handleUpdateUsersClick = () => setView('updateUsers');
  const handleDeleteUsersClick = () => setView('deleteUsers');
  const handleCreateProjectClick = () => setView('createProject');

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projects.find(p => p.id === parseInt(projectId)));
  };

  const handleUserAssignment = (e) => {
    const { name, checked } = e.target;
    setAssignedUsers(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    console.log('Assigned Users:', assignedUsers);
    alert('Users assigned to project!');
    setView('dashboard');
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    console.log('Updated User:', editUser);
    alert('User updated successfully!');
    setView('dashboard');
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    console.log('Deleted User:', selectedUser);
    alert('User deleted successfully!');
    setView('dashboard');
  };

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
    setView('dashboard');
  };

  return (
    <div className='mkbg-admin'>
      <Navbar className="custom-navbar" expand="lg">
        <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='admin-left'>
            <Nav.Link as={Link} to="#" onClick={() => setView('dashboard')}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={handleCreateProjectClick}>Create Project</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={() => setView('createTask')}>Create Task</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={handleAssignUsersClick}>Assign Users</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={handleUpdateUsersClick}>Update Users</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={handleDeleteUsersClick}>Delete Users</Nav.Link>
          </Nav>
          <Nav className='admin-right'>
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
        {view === 'dashboard' && (
          <>
            <Row>
              {projects.map((project, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{project.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Project Manager: {project.manager}</Card.Subtitle>
                      <Card.Text>{project.description}</Card.Text>
                      <Card.Footer className="text-muted">End Date: {project.endDate}</Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
        
        {view === 'createProject' && (
          <CreateProject onAddProject={handleAddProject} />
        )}

        {view === 'createTask' && (
          <CreateTask />
        )}

        {view === 'assignUsers' && (
          <Container className="mt-4">
            <h2>Assign Users to Project</h2>
            <Form onSubmit={handleSubmitAssignment}>
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
                <>
                  <h3>Assign to {selectedProject.name}</h3>
                  <Form.Group>
                    <h4>Team Members</h4>
                    {users.teamMembers.map(user => (
                      <Form.Check
                        key={user.id}
                        type="checkbox"
                        label={user.name}
                        name={`team-${user.id}`}
                        onChange={handleUserAssignment}
                      />
                    ))}
                  </Form.Group>
                  <Form.Group>
                    <h4>Project Managers</h4>
                    {users.projectManagers.map(user => (
                      <Form.Check
                        key={user.id}
                        type="checkbox"
                        label={user.name}
                        name={`manager-${user.id}`}
                        onChange={handleUserAssignment}
                      />
                    ))}
                  </Form.Group>
                  <Form.Group>
                    <h4>Clients</h4>
                    {users.clients.map(user => (
                      <Form.Check
                        key={user.id}
                        type="checkbox"
                        label={user.name}
                        name={`client-${user.id}`}
                        onChange={handleUserAssignment}
                      />
                    ))}
                  </Form.Group>
                  <Button variant="primary" type="submit">Assign Users</Button>
                </>
              )}
            </Form>
          </Container>
        )}

        {view === 'updateUsers' && (
          <Container className="mt-4">
            <h2>Update User</h2>
            <Form onSubmit={handleSubmitUpdate}>
              <Form.Group controlId="formUserRole">
                <Form.Label>Select User Role</Form.Label>
                <Form.Control as="select" name="role" onChange={e => {
                  setEditUser(prev => ({
                    ...prev,
                    role: e.target.value
                  }));
                }}>
                  <option value="">Select a role</option>
                  <option value="teamMembers">Team Members</option>
                  <option value="projectManagers">Project Managers</option>
                  <option value="clients">Clients</option>
                </Form.Control>
              </Form.Group>
              {editUser.role && (
                <Form.Group controlId="formSelectUser">
                  <Form.Label>Select User</Form.Label>
                  <Form.Control as="select" name="id" onChange={e => {
                    const user = users[editUser.role].find(u => u.id === parseInt(e.target.value));
                    setEditUser({
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      role: editUser.role
                    });
                  }}>
                    <option value="">Select a user</option>
                    {users[editUser.role].map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
              {editUser.id && (
                <>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editUser.name}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editUser.email}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={editUser.phone}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">Update User</Button>
                </>
              )}
            </Form>
          </Container>
        )}

        {view === 'deleteUsers' && (
          <Container className="mt-4">
            <h2>Delete User</h2>
            <Form onSubmit={handleSubmitDelete}>
              <Form.Group controlId="formDeleteUserRole">
                <Form.Label>Select User Role</Form.Label>
                <Form.Control as="select" name="role" onChange={e => {
                  setEditUser(prev => ({
                    ...prev,
                    role: e.target.value
                  }));
                }}>
                  <option value="">Select a role</option>
                  <option value="teamMembers">Team Members</option>
                  <option value="projectManagers">Project Managers</option>
                  <option value="clients">Clients</option>
                </Form.Control>
              </Form.Group>
              {editUser.role && (
                <Form.Group controlId="formSelectDeleteUser">
                  <Form.Label>Select User</Form.Label>
                  <Form.Control as="select" name="id" onChange={e => {
                    const user = users[editUser.role].find(u => u.id === parseInt(e.target.value));
                    setSelectedUser(user);
                  }}>
                    <option value="">Select a user</option>
                    {users[editUser.role].map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
              {selectedUser && (
                <Button variant="danger" type="submit">Delete User</Button>
              )}
            </Form>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
