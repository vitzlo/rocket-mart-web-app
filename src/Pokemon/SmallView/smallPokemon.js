import React, { useState, useEffect } from "react";
import { findPokemon, findPokemonById } from "../../Utils/client";
import { useNavigate } from "react-router-dom";

function SmallPokemon({ pokemonId, pokemonName }) {
  const [pokemonData, setPokemonData] = useState(undefined);
  const navigate = useNavigate();

  const setPokemonById = async (id) => {
    const poke = await findPokemonById(id);
    setPokemonData(poke);
  };
  const setPokemonByName = async (name) => {
    const poke = await findPokemon(name);
    setPokemonData(poke);
  };
  const redirect = () => {
    navigate(`/pokemon/${pokemonData.id}`);
  };

  useEffect(() => {
    pokemonId !== undefined
      ? setPokemonById(pokemonId)
      : setPokemonByName(pokemonName);
  }, [pokemonId, pokemonName]);
 
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
