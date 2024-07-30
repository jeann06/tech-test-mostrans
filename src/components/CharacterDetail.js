import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/CharacterDetailPage.css";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [charactersByLocation, setCharactersByLocation] = useState({});

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the character:", error);
      });

    const storedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    const storedCharactersByLocation =
      JSON.parse(localStorage.getItem("charactersByLocation")) || {};
    setLocations(storedLocations);
    setCharactersByLocation(storedCharactersByLocation);
  }, [id]);

  const handleAssignLocation = () => {
    if (location && !locations.includes(location)) {
      const newLocations = [...locations, location];
      const newCharactersByLocation = {
        ...charactersByLocation,
        [location]: [...(charactersByLocation[location] || []), character],
      };

      setLocations(newLocations);
      setCharactersByLocation(newCharactersByLocation);

      localStorage.setItem("locations", JSON.stringify(newLocations));
      localStorage.setItem(
        "charactersByLocation",
        JSON.stringify(newCharactersByLocation)
      );

      setLocation("");
    } else {
      alert("Location must be unique and not empty");
    }
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-detail">
      <h1>{character.name}</h1>
      <img
        src={character.image}
        alt={character.name}
        className="character-image"
      />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
        className="character-location-input"
      />
      <button onClick={handleAssignLocation}>Assign to Location</button>

      <div className="navigation-buttons">
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Character List
        </button>
        <button
          className="view-location-button"
          onClick={() => navigate("/locations")}
        >
          View Characters By Location
        </button>
      </div>
    </div>
  );
};

export default CharacterDetail;
