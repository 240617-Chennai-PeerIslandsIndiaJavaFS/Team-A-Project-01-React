import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Homepage.css';

const HomePage = () => {
  return (
    <div className="mkbgclr-home">
      {/* Navbar */}
      <Navbar className="custom-navbar-home"  expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-left">
            <NavDropdown className="nav-dropdown" title="Features" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/create-project">Create Project</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/create-task">Create Task</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="nav-dropdown" title="Clients" id="basic-nav-dropdown">
              <NavDropdown.Item href="#amazon">Amazon</NavDropdown.Item>
              <NavDropdown.Item href="#flipkart">Flipkart</NavDropdown.Item>
              <NavDropdown.Item href="#tech-mahindra">Tech Mahindra</NavDropdown.Item>
              <NavDropdown.Item href="#infosys">Infosys</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="nav-right">
            <Nav.Link as={Link} to="/support">
              <Button variant="outline-primary">Support</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              <Button variant="outline-secondary">Sign In</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              <Button variant="success">Sign Up</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <div className="container main-content">
        <h1 className="main-heading">Rev Task Management</h1>
        <p>Welcome to the Rev Task Management dashboard. Use the navigation bar to access features and manage tasks.</p>
      </div>
    </div>
  );
};

export default HomePage;