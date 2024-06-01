import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import levologo from "../assets/levo_logo.jpeg";
import { Card, CardBody } from "react-bootstrap";

const AuthenticationPage = (pageType) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <Card className="shadow" style={{ maxWidth: "800px", width: "100%" }}>
        <CardBody>
          <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
              <MDBCol col="10" md="6">
                <img src={levologo} className="img-fluid" alt="Sample image" />
              </MDBCol>

              <MDBCol col="4" md="6">
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <p className="lead fw-normal mb-0 me-3">Signin Page</p>
                </div>

                <div className="divider d-flex align-items-center my-4"></div>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />

                <div className="text-center text-md-start mt-4 pt-2">
                  <MDBBtn className="mb-0 px-5" size="lg">
                    Login
                  </MDBBtn>
                  <p className="small fw-bold mt-2 pt-1 mb-2">
                    Don't have an account?{" "}
                    <a href="#!" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AuthenticationPage;
