import React from "react";
const PokemonRow = ({ category, pokemonList }) => {
  return (
    <div className="text-center m-2">
      <h2>{category}</h2>
      <div className="row flex-nowrap rm-horizontal-scroll mx-4">
        {pokemonList.map((pokemon) => (
          // TODO: replace with the small card for pokemon
          <div key={pokemon.species.name} className="m-4 col">
            {pokemon.species.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonRow;
