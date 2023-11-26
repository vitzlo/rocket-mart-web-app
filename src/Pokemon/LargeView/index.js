import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findPokemonById } from "../../Utils/client";

function LargePokemon() {
  const [pokemon, setPokemon] = useState(undefined);
  const { pokemonId } = useParams();

  useEffect(() => {
    const setPokemonByID = async (id) => {
      const poke = await findPokemonById(id);
      console.log(poke);
      setPokemon(poke);
    };
    setPokemonByID(pokemonId);
  }, [pokemonId, setPokemon]);
  return (
    <div className="container-fluid rm-large-pokemon">
      {pokemon && (
        <div>
          <div className="rm-pokemon-name text-nowrap">{pokemon.name}</div>
          <div className="row">
            <div classname="col">
              <img
                src={pokemon.sprites.large}
                alt={pokemon.name}
                className="rm-pokemon-image"
              />
            </div>
            <div className="col">
              <div className="row w-50">
                <div className="rm-pokemon-label">Height</div>
                <div className="rm-pokemon-value">{pokemon.height} m</div>
                <div className="rm-pokemon-label">Weight</div>
                <div className="rm-pokemon-value">{pokemon.weight} kg</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default LargePokemon;
