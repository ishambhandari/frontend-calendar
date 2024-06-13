import React, { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { Container, Row, Col, Button } from "react-bootstrap";
import SuccessToast from "./SuccessToast";
import ErrorToast from "./ErrorToast";
import "./styles.css";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

export default function Holidayview(events, holiday) {
  const [basicActive, setBasicActive] = useState("tab1");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  const deleteEvent = (id) => {
    setLoading(true);
    axios
      .delete(`http://3.25.70.122:8000/api/events/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setShowDeleteAlert(true);
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
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
      {showDeleteAlert && <SuccessToast sucess="Event deleted!" />}
      <MDBTabs className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            Events
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === "tab1"}>
          <Container>
            {events.events.map((event, index) => (
              <Row key={index} className="event-row">
                <Col md={8} className="event-details">
                  {event.title}
                </Col>
                <Col md={4} className="delete-button">
                  <Button
                    onClick={() => deleteEvent(event.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
          </Container>
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}
