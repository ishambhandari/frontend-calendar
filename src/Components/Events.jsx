import React, { useState, useEffect } from "react";
import axios from "axios";
import { get, post } from "../utils/api";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
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
    const formattedStartTime = new Date(
      startDate + "T" + startTime,
    ).toISOString();
    const formattedEndTime = new Date(endDate + "T" + endTime).toISOString();
    post("/events", {
      title: title,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    })
      .then((res) => {
        setEvents([...events, res]);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/events/${id}/`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container>
      <h1>Events</h1>
      <div>
        <h2>Create Event</h2>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Form.Group>
          <Form.Group controlId="formStartTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <br />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </Form.Group>
          <Form.Group controlId="formEndTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={createEvent}>
            Create
          </Button>
        </Form>
      </div>
      <div>
        <h2>Events</h2>
        <ListGroup>
          {console.log("events", events)}
          {events.length > 0 ? (
            events.map((event) => (
              <ListGroup.Item key={event.id}>
                <div>{event.title}</div>
                <div>{event.description}</div>
                <div>
                  Start Time: {new Date(event.start_time).toLocaleString()}
                </div>
                <div>End Time: {new Date(event.end_time).toLocaleString()}</div>
                <Button variant="danger" onClick={() => deleteEvent(event.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No events found</ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </Container>
  );
};

export default EventCRUD;
