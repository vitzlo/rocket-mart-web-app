import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SmallPokemon from "../Pokemon/SmallView/smallPokemon";

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
      <h1 className="ms-5 mb-0 text-nowrap">{category}</h1>
      <div className="rm-carousel-container">
        <div className="row flex-nowrap rm-carousel" id={category}>
          {pokemonList.map((pokemon, index) => (
            <div className="col-auto p-0 rm-carousel-item">
              <SmallPokemon key={index} pokemonId={pokemon} />
            </div>
          ))}
          <button
            className="rm-carousel-button"
            style={{ left: "2%" }}
            onClick={() => scrollRow(-400)}
          >
            <IoIosArrowBack />
          </button>
          <button
            className="rm-carousel-button"
            style={{ right: "2%" }}
            onClick={() => scrollRow(400)}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonRow;
