import React from "react";
import Badge from "../Pokemon/LargeView/Types/pokemonTypeBadge";

const Types = () => {
  const types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
  ];

  return (
    <div className="m-2">
      <h2 className="ms-5 text-nowrap">Search by Types</h2>
      <div className="row mx-4">
        {types.map((type) => (
          <Badge key={type} type={type} />
        ))}
      </div>
    </div>
  );
};

export default Types;
