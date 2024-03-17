
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Col, Container, Row, Button, Card } from 'react-bootstrap';

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
          console.log('Attempting login...');
          const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
          // Handle successful login (e.g., store token, redirect user)
          console.log('Login successful:', response.data);

              // Redirect to the dashboard page after successful login
            window.location.href = 'http://localhost:5173/dashboard';
        } catch (error) {
          setError('Invalid username or password');
        }
      };

  return (
    <Container fluid className="login-container bg-primary"> {/* Blue marine background */}
      <Row className="justify-content-md-center"> {/* Center the content horizontally */}
        <Col md={6}> {/* Card takes up 6 columns on medium screens */}
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Login</h1> {/* Centered heading */}
              <Form>

                <Form.Group as={Col} controlId="formEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Email" required />
                </Form.Group>
                <Form.Group as={Col} controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
                </Form.Group>
                <Button  className="btn btn-primary w-100" onClick={handleLogin}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
