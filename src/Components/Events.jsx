import React, { useState, useEffect } from "react";
import axios from "axios";
import { get, del, post } from "../utils/api";
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

const EventCRUD = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [createAlert, setCreateAlert] = useState(false);

  const fetchEvents = async () => {
    get("/events/")
      .then((res) => {
        console.log("res", res);
        setEvents(res); // Assuming the response is an array
      })
      .catch((res) => {
        console.log("error", res);
      });
  };

  const createEvent = async () => {
    console.log("startime", startDate);
    console.log("startime", startTime);
    const formattedStartTime = `${startDate.toISOString().split("T")[0]}T${startTime}:00`;
    const formattedEndTime = `${endDate.toISOString().split("T")[0]}T${endTime}:00`;
    console.log("formattime", formattedStartTime);
    post("/events/", {
      title: title,
      description: description,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    })
      .then((res) => {
        setEvents([...events, res]);
        console.log("this is res", res);
        setCreateAlert(true);
        setTimeout(() => setCreateAlert(false), 3000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        console.log("time", formattedStartTime);
        console.log("time", formattedEndTime);
      });
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://3.25.70.122:8000/api/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
      setShowDeleteAlert(true);
      setTimeout(() => setShowDeleteAlert(false), 3000); // Hide alert after 3 seconds
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {showDeleteAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowDeleteAlert(false)}
          dismissible
        >
          Event Deleted
        </Alert>
      )}

      {createAlert && (
        <Alert
          variant="success"
          onClose={() => setCreateAlert(false)}
          dismissible
        >
          Event Created
        </Alert>
      )}
      <Container>
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
              {console.log("events", events)}
              {events.length > 0 ? (
                events.map((event) => (
                  <ListGroup.Item key={event.id} className="mb-3">
                    <div className="fw-bold">{event.title}</div>
                    <div>{event.description}</div>
                    <div>
                      Start Time: {new Date(event.start_time).toLocaleString()}
                    </div>
                    <div>
                      End Time: {new Date(event.end_time).toLocaleString()}
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
