import React, { useState, useEffect } from "react";
import { findPokemon, findPokemonById } from "../../Utils/client";
import { useNavigate } from "react-router-dom";

function SmallPokemon({ pokemonId, pokemonName }) {
  const [pokemonData, setPokemonData] = useState(undefined);
  const navigate = useNavigate();
  // might not need to prune or even need this if we want to make it
  // so it always is by name but i wanted to save some API requests
  useEffect(() => {
    const setPokemonById = async (name) => {
      const poke = await findPokemonById(name);
      setPokemonData(poke);
    };
    const setPokemonByName = async (name) => {
      const poke = await findPokemon(name);
      setPokemonData(poke);
    };
    pokemonId !== undefined
      ? setPokemonById(pokemonId)
      : setPokemonByName(pokemonName);
  }, [pokemonId, pokemonName, setPokemonData]);
  const redirect = () => {
    navigate(`/pokemon/${pokemonData.id}`);
  };
  return (
    pokemonData && (
      <div className="rm-small-pokemon" onClick={redirect}>
        <img
          src={pokemonData.sprites.large}
          alt={pokemonData.name}
          className="rm-pokemon-image"
        />
        <div className="rm-pokemon-name-container"></div>
        <div className="rm-pokemon-name">
          {pokemonData.name.replaceAll("-", " ")}
        </div>
      </div>
    )
  );
}
export default SmallPokemon;
