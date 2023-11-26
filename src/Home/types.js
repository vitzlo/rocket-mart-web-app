import React, { useState, useEffect } from "react";
import axios from "axios";

const Types = () => {
  const API_BASE = "https://pokeapi.co/api/v2";
  // state variable for types probably not needed, could probably make a constant for all the types
  const [types, setTypes] = useState([]);

  const fetchTypes = async () => {
    const response = await axios.get(`${API_BASE}/type`);
    setTypes(response.data.results);
  };

  const selectType = (type) => {
    console.log("redirect to search results for type: ", type);
  };

  useEffect(() => {
    fetchTypes();
  }, []);
  return (
    <div className="text-center m-2">
      <h2>Search by Types</h2>
      <div className="row flex-nowrap rm-horizontal-scroll mx-4">
        {types.map((type) => (
          <div
            key={type.name}
            className="rm-curser-pointer m-4 col"
            onClick={() => selectType(type)}
          >
            {/* TODO: make it so it uses a type image of some sort? maybe a random pokemon of the type or something */}
            {type.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;
