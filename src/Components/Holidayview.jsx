import React, { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./styles.css";
import axios from "axios";

export default function Holidayview(events, holiday) {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  return (
    <>
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
                  {event.title} - {event.start}
                </Col>
                <Col md={4} className="delete-button">
                  <Button onClick={() => deleteEvent(index)} variant="danger">
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
