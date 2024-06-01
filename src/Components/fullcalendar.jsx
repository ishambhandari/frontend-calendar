import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { redirect } from "react-router-dom"; // Import Redirect
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import CountryPicker from "./CountryPicker";
import { useNavigate } from "react-router-dom";

export default function Calendar() {
  const get_countries_url =
    "https://holidayapi.com/v1/countries?pretty&key=d5f5fe17-781a-4879-a99a-a72829b438e3";

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [initialDate, setInitialDate] = useState(new Date()); // Set initial date to today
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date

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
      //setCountries(...res.data.countries);
    });
  };

  const getHolidays = (holidays) => {
    const holiday = [];
    holidays.map((res) => {
      holiday.push({ title: res.name, start: res.date, allDay: true });
    });
    setHoliday(holiday);
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
  }, []);

  // Check if user is logged in, if not, redirect to login page

  return (
    <>
      <Container>
        <CountryPicker countries={countries} getHolidays={getHolidays} />
      </Container>
      <div className="calendar-container">
        <FullCalendar
          initialDate={initialDate} // Set initial date
          initialView="dayGridMonth" // Set initial view to month view
          events={holiday}
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
