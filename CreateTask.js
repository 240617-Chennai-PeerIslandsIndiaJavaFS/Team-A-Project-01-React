import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task created:', formData);
    // Implement task creation logic

    // Show alert message
    window.alert('Created Task Successfully!');
  };

  return (
    <Container>
      <h2>Create Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTask;