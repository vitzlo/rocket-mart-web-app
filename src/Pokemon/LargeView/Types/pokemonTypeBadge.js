import React from "react";
import { useNavigate } from "react-router";

function Badge({ type }) {
  const navigate = useNavigate();
  const typeColors = new Map([
    ["grass", "#78C850"],
    ["poison", "#A040A0"],
    ["fire", "#F08030"],
    ["flying", "#A890F0"],
    ["water", "#6890F0"],
    ["bug", "#A8B820"],
    ["normal", "#A8A878"],
    ["electric", "#F8D030"],
    ["ground", "#E0C068"],
    ["fairy", "#EE99AC"],
    ["fighting", "#C03028"],
    ["psychic", "#F85888"],
    ["rock", "#B8A038"],
    ["steel", "#B8B8D0"],
    ["ice", "#98D8D8"],
    ["ghost", "#705898"],
    ["dragon", "#7038F8"],
    ["dark", "#705848"],
  ]);

  const handleClick = () => {
    navigate(`/results/type/${type}`);
  };

  return (
    <div
      className="rm-type col"
      onClick={handleClick}
      style={{
        background: `radial-gradient(rgb(0, 0, 0, 0.3), 60%, rgb(0, 0, 0, 0)), 
        ${typeColors.get(type)}`,
      }}
    >
      {type}
    </div>
  );
}

export default Badge;
