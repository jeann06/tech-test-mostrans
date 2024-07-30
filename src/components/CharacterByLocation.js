import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CharacterByLocation.css";

const CharacterByLocation = () => {
  const [locations, setLocations] = useState([]);
  const [charactersByLocation, setCharactersByLocation] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    const storedCharactersByLocation =
      JSON.parse(localStorage.getItem("charactersByLocation")) || {};
    setLocations(storedLocations);
    setCharactersByLocation(storedCharactersByLocation);
  }, []);

  const handleLocationSelect = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
  };

  return (
    <div className="character-by-location">
      <h1>Characters By Location</h1>
      <div className="dropdown-container">
        <h2>Locations</h2>
        <select onChange={handleLocationSelect} className="location-dropdown">
          <option value="">Select a location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="characters-container">
        {selectedLocation && (
          <>
            <h2>Characters at {selectedLocation}</h2>
            <ul className="characters-list">
              {charactersByLocation[selectedLocation]?.map(
                (character, index) => (
                  <li key={index}>
                    <Link to={`/character/${character.id}`}>
                      {character.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterByLocation;
