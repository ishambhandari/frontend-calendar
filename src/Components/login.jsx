import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import levologo from "../assets/levo_logo.jpeg";
import { Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom"; // Assuming you are using react-router-dom for routing
import { get, post } from "../utils/api";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import ErrorToast from "./ErrorToast";
import "./styles.css";

const AuthenticationPage = ({ pageType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Added username state
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const baseURL = "http://3.25.70.122:8000/";
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("test", username, password);
    post(`${baseURL}/api/login/`, { username, password })
      .then((response) => {
        console.log("this is res", response);
        localStorage.setItem("token", response.access_token);
        console.log("hereerer");
        navigate("/");
        setLoading(false);
      })
      .catch((e) => {
        console.log("here", e);
        setShowAlert(`${e.response.data.error}`); // Set the error message
        setLoading(false);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("asdf", username, password, email);
    post("api/signup/", { username, password, email })
      .then((res) => {
        console.log("success", res);
        navigate("/login");
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data);
        setShowAlert(`Error ${e.response.data.username}`);
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <InfinitySpin
          visible={true}
          width="200"
          color="#87CEEB"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }
  return (
    <>
      {showAlert && <ErrorToast error={showAlert} />}
      <Container
        fluid
        className="d-flex align-items-center justify-content-center vh-100"
      >
        <Card className="shadow" style={{ maxWidth: "800px", width: "100%" }}>
          <CardBody>
            <MDBContainer fluid className="p-3 my-5 h-custom">
              <MDBRow>
                <MDBCol col="10" md="6">
                  <img
                    src={levologo}
                    className="img-fluid"
                    alt="Sample image"
                  />
                </MDBCol>

                <MDBCol col="4" md="6">
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <p className="lead fw-normal mb-0 me-3">
                      {pageType === "login" ? "Signin Page" : "Signup Page"}
                    </p>
                  </div>

                  <div className="divider d-flex align-items-center my-4"></div>

                  {pageType === "signup" && (
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email address"
                      id="formControlLg"
                      type="email"
                      size="lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Handle email change
                    />
                  )}

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Username"
                    id="formControlLg"
                    type="text" // Assuming username is text
                    size="lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Handle username change
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Handle password change
                  />

                  <div className="text-center text-md-start mt-4 pt-2">
                    {pageType === "login" ? (
                      <Button onClick={handleLogin}>Login</Button>
                    ) : (
                      <Button onClick={handleSignup}>Signup</Button>
                    )}

                    {pageType === "login" ? (
                      <p className="small fw-bold mt-2 pt-1 mb-2">
                        Don't have an account?{" "}
                        <Link to="/signup" className="link-danger">
                          Register
                        </Link>
                      </p>
                    ) : (
                      <p className="small fw-bold mt-2 pt-1 mb-2">
                        Already have an account?{" "}
                        <Link to="/login" className="link-danger">
                          Login
                        </Link>
                      </p>
                    )}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default AuthenticationPage;
