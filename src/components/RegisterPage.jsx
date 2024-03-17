import React, { useState } from 'react';
import { Form, Col, Container, Row, Card } from 'react-bootstrap';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
        role
      });
      console.log('Registration successful:', response.data);
      // Redirect the user to login and show a success message
      window.location.href = 'http://localhost:5173/login';
    } catch (error) {
      console.error('Registration error:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <Container fluid className="register-container bg-primary">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Register</h1>
              <Form onSubmit={handleRegister}>
                <Form.Group as={Col} controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" placeholder="Enter Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formRole">
                  <Form.Label>Role:</Form.Label>
                  <Form.Select required value={role} onChange={(e) => setRole(e.target.value)}> {/* Update the role state */}
                    <option value="">Select Role</option> {/* Add an empty option for default selection */}
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </Form.Select>
                </Form.Group>
                <button  className="btn btn-primary w-100">
                  Register
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
