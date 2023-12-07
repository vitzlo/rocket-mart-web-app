import React from "react";
import SmallPokemon from "../Pokemon/SmallView";

const PokemonRow = ({ category, pokemonList }) => {
  const scrollRow = (amount) => {
    const row = document.getElementById(category);
    row.scroll({
      left: row.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="m-2">
      <h2 className="ms-5">{category}</h2>
      <div className="rm-carousel-container">
        <div className="row flex-nowrap rm-carousel" id={category}>
          {pokemonList.map((pokemon) => (
            <div className="col-auto rm-carousel-item">
              <SmallPokemon key={pokemon.species.name} pokemon={pokemon} />
            </div>
          ))}
          <button
            className="rm-carousel-button"
            style={{ left: "2%" }}
            onClick={() => scrollRow(-300)}
          >
            Left
          </button>
          <button
            className="rm-carousel-button"
            style={{ right: "2%" }}
            onClick={() => scrollRow(300)}
          >
            Right
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonRow;
