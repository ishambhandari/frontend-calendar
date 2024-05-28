import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";

const SignupPage = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic here
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md="6">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Signup</h2>
              <Form onSubmit={handleSignup}>
                <Form.Group controlId="formBasicSignupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicSignupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Signup
                </Button>
              </Form>
            </Card.Body>
          </Card>
          {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
              className="mt-3"
            >
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>Change this and that and try again.</p>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
