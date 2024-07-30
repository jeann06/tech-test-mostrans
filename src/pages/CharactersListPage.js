import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CharactersListPage.css";

const CharactersListPage = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  }, []);

  return (
    <div className="characters-list">
      <h1>Characters List</h1>
      <div className="character-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-item">
            <Link to={`/character/${character.id}`}>
              <img
                src={character.image}
                alt={character.name}
                className="character-image"
              />
              <div className="character-info">
                <h2>{character.name}</h2>
                <p>{character.species}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/locations" className="locations-link">
        Go to Characters By Location
      </Link>
    </div>
  );
};

export default CharactersListPage;
