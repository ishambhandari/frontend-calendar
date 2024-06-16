import React, { useState, useEffect } from "react";
import levologo from "../assets/levo_logo.jpeg";
import axios from "axios";
import { get, del, post } from "../utils/api";
import { InfinitySpin } from "react-loader-spinner";
import {
  Card,
  Row,
  Col,
  Container,
  Form,
  Button,
  ListGroup,
  Alert,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import TimezonePicker from "./TimezonePicker";
import { useNavigate, Link } from "react-router-dom";
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";

const EventCRUD = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  //const [selectedTimezone, setSelectedTimezone] = useState(""); // State for selected timezone
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [createAlert, setCreateAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://3.25.70.122:8000/api/events/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createEvent = async () => {
    const baseURL = "http://3.25.70.122:8000/";

    // Format start and end dates with time
    const formattedStartDateTime = new Date(
      `${startDate.toISOString().split("T")[0]}T${startTime}:00`,
    );
    const formattedEndDateTime = new Date(
      `${endDate.toISOString().split("T")[0]}T${endTime}:00`,
    );

    const formattedStartUTC = formattedStartDateTime.toISOString().slice(0, -5);
    const formattedEndUTC = formattedEndDateTime.toISOString().slice(0, -5);

    const timezoneOffset = new Date().getTimezoneOffset();
    const adjustedStartUTC =
      new Date(formattedStartUTC).getTime() - timezoneOffset * 60 * 1000;
    const adjustedEndUTC =
      new Date(formattedEndUTC).getTime() - timezoneOffset * 60 * 1000;

    const finalFormattedStartUTC = new Date(adjustedStartUTC)
      .toISOString()
      .slice(0, -5);
    const finalFormattedEndUTC = new Date(adjustedEndUTC)
      .toISOString()
      .slice(0, -5);

    console.log("this is data", finalFormattedStartUTC, finalFormattedEndUTC);
    setLoading(true);

    post(`${baseURL}api/events/`, {
      title: title,
      description: description,
      start_time: finalFormattedStartUTC,
      end_time: finalFormattedEndUTC,
      timezone: selectedTimezone, // Include selected timezone in the request payload
    })
      .then((res) => {
        setEvents([...events, res]);
        setCreateAlert(true);
        setTimeout(() => setCreateAlert(false), 3000);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating event:", error.response.data);
        setFailAlert(`${JSON.stringify(error.response.data)}`);
        setLoading(false);
      });
  };
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://3.25.70.122:8000/api/events/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter((event) => event.id !== id));
      setShowDeleteAlert(true);
      setTimeout(() => setShowDeleteAlert(false), 3000);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login/");
    }
  }, []);

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
      {failAlert && <ErrorToast error={failAlert} />}
      {showDeleteAlert && <SuccessToast sucess="Event deleted!" />}

      {createAlert && <SuccessToast success="Event Created" />}

      <div style={{ textAlign: "center", height: "40px" }}>
        <img src={levologo} className="img-fluid" alt="Sample image" />
      </div>

      <Container>
        <div style={{ textAlign: "right" }}>
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
        <h1 className="my-4">Events</h1>
        <Card className="mb-4">
          <Card.Header>
            <h2>Create Event</h2>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formStartTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formEndDate">
                    <Form.Label>End Date</Form.Label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formEndTime">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* Add TimezonePicker component */}
              <TimezonePicker
                onSelect={(timezone) => setSelectedTimezone(timezone)}
              />
              <Button variant="primary" onClick={createEvent}>
                Create
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h2>Events</h2>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {events.length > 0 ? (
                events.map((event) => (
                  <ListGroup.Item key={event.id} className="mb-3">
                    <div className="fw-bold">{event.title}</div>
                    <div>{event.description}</div>
                    <div>
                      Start Time: {new Date(event.start_time).toLocaleString()}{" "}
                      UTC
                    </div>
                    <div>
                      End Time: {new Date(event.end_time).toLocaleString()} UTC
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => deleteEvent(event.id)}
                      className="mt-2"
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No events found</ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default EventCRUD;
