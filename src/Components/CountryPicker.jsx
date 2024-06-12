import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios"; // Import Axios

const CountryPicker = ({ countries, getHolidays }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  // Convert countries array to options array for React Bootstrap Select
  const options = countries.map((country) => (
    <option key={country.code} value={country.code}>
      {country.name}
    </option>
  ));

  // Handle country selection
  const handleSelectCountry = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    let holiday = [];

    // Call API to fetch country information
    axios
      .get(
        `https://holidayapi.com/v1/holidays?pretty&key=d5f5fe17-781a-4879-a99a-a72829b438e3&country=${countryCode}&year=2023`,
      )
      .then((response) => {
        console.log("cc", response.data);
        getHolidays(response.data.holidays);
      })
      .catch((error) => {
        console.error("Error fetching country information:", error);
      });
  };

  return (
    <div style={{ width: "30%", padding: "20px" }}>
      <h3>Select a country:</h3>
      <Form.Select
        value={selectedCountry}
        onChange={handleSelectCountry}
        aria-label="Select a country"
      >
        <option value="">Search for a country...</option>
        {options}
      </Form.Select>

      {/* Display selected country information */}
      {countryInfo && (
        <div>
          <h2>{countryInfo.name}</h2>
          <p>Population: {countryInfo.population}</p>
          {/* Add more country information as needed */}
        </div>
      )}
    </div>
  );
};

export default CountryPicker;
