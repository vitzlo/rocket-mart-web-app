import React from "react";
import SmallPokemon from "../Pokemon/SmallView";
const PokemonRow = ({ category, pokemonList }) => {
  return (
    <div className="text-center m-2">
      <h2>{category}</h2>
      <div className="row flex-nowrap rm-horizontal-scroll mx-4">
        {pokemonList.map((pokemon, index) => (
          <SmallPokemon key={index} pokemonId={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonRow;
