import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { redirect } from "react-router-dom"; // Import Redirect
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container, Button, Row } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import CountryPicker from "./CountryPicker";
import { useNavigate, Link } from "react-router-dom";

export default function Calendar() {
  const get_countries_url =
    "https://holidayapi.com/v1/countries?pretty&key=d5f5fe17-781a-4879-a99a-a72829b438e3";

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [initialDate, setInitialDate] = useState(new Date()); // Set initial date to today
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [newEvents, setNewEvents] = useState([]);

  const handleSelect = (info) => {
    const { start, end } = info;
    setSelectedDate(start); // Update selected date state

    const eventNamePrompt = prompt("Enter event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid(),
        },
      ]);
    }
  };

  const getCountries = () => {
    axios({
      method: "get",
      url: get_countries_url,
      responseType: "stream",
    }).then((res) => {
      setCountries(...res.data.countries);
    });
  };

  const showEvents = () => {
    console.log("thisssss", events);
  };

  const getHolidays = (holidays) => {
    const holidayEvents = holidays.map((res) => ({
      title: res.name,
      start: res.date,
      allDay: true,
    }));

    setHoliday(holidayEvents);
  };
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login/");
    }
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://holidayapi.com/v1/countries?pretty&key=d5f5fe17-781a-4879-a99a-a72829b438e3",
        );
        setCountries(response.data.countries);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchCountries();
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://3.25.70.122:8000/api/events/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        const eventsData = response.data; // Assuming the response is an array of events

        // Map over the events data to create the newEvents array
        const newEventsData = eventsData.map((event) => ({
          title: event.title, // Adjust property names if necessary
          start: event.start_time.split("T")[0],
          allDay: true,
        }));

        // Set the newEvents state with the mapped events data
        setNewEvents(newEventsData);

        console.log("newEvents", newEvents);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // Check if user is logged in, if not, redirect to login page

  return (
    <>
      <Container>
        <CountryPicker countries={countries} getHolidays={getHolidays} />
        <Link to="events/">
          {" "}
          <Button style={{ marginTop: "10px" }}>View/Update Event</Button>{" "}
        </Link>
      </Container>
      <div className="calendar-container">
        <FullCalendar
          initialDate={initialDate} // Set initial date
          initialView="dayGridMonth" // Set initial view to month view
          events={[...newEvents, ...holiday]}
          select={handleSelect}
          headerToolbar={{
            start: "today prev next",
            center: "title", // Display the selected date in the toolbar
            end: "dayGridMonth dayGridWeek dayGridDay",
          }}
          plugins={[dayGridPlugin, interactionPlugin]}
          views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        />
      </div>
    </>
  );
}
