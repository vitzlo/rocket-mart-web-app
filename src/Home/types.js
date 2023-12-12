import React, { useState, useEffect } from "react";
import axios from "axios";
import Badge from "../Pokemon/LargeView/Types/pokemonTypeBadge";

const Types = () => {
  const API_BASE = "https://pokeapi.co/api/v2";
  // state variable for types probably not needed, could probably make a constant for all the types
  const [types, setTypes] = useState([]);

  const fetchTypes = async () => {
    const response = await axios.get(`${API_BASE}/type`);
    setTypes(response.data.results);
  };

  useEffect(() => {
    fetchTypes();
  }, []);
  return (
    <div className="text-center m-2">
      <h2>Search by Types</h2>
      <div className="row mx-4">
        {types.map((type) => (
          <Badge key={type.name} type={type.name} />
        ))}
      </div>
    </div>
  );
};

export default Types;
