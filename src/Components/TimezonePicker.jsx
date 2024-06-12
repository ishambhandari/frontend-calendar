import React, { useState, useEffect } from "react";

const TimezonePicker = ({ onSelect }) => {
  const [supportedTimezones, setSupportedTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState("");

  useEffect(() => {
    const getTimezoneOptions = () => {
      try {
        const timezones = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setSupportedTimezones(Intl.supportedValuesOf("timeZone"));
        setSelectedTimezone(timezones);
      } catch (error) {
        console.error("Error fetching timezones:", error);
      }
    };
    getTimezoneOptions();
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedTimezone(selected);
    onSelect(selected);
  };

  const convertToUTC = (timezone) => {
    const date = new Date().toLocaleString("en-US", { timeZone: timezone });
    const utcDate = new Date(date);
    return utcDate.toISOString();
  };

  return (
    <div>
      <label htmlFor="timezone">Select a Timezone:</label>
      <select id="timezone" value={selectedTimezone} onChange={handleChange}>
        <option value="">Select a timezone</option>
        {supportedTimezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezonePicker;
