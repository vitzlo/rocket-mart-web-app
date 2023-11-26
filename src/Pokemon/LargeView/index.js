import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findPokemonById } from "../../Utils/client";
import Listing from "./listing";

function LargePokemon() {
  const [pokemon, setPokemon] = useState(undefined);
  const { pokemonId } = useParams();

  const listedPokemon = [
    {
      listingId: 120,
      timeOfListing: new Date(2023, 11, 17, 19, 33),
      sellerId: 491,
      cost: 100,
      pokemon: {
        // any other fields that might be useful to display here?
        height: 5,
        weight: 940,
      },
    },
    {
      listingId: 231,
      timeOfListing: new Date(2022, 4, 5, 19, 34),
      sellerId: 321,
      cost: 90,
      pokemon: {
        height: 3.6,
        weight: 800,
      },
    },
  ];

  // TODOS:
  // maybe add evolution chain as data shown?
  // add a button to list the pokemon
  // add a button to go back to the search results??? (might be tough bc we need history)

  useEffect(() => {
    const setPokemonByID = async (id) => {
      const poke = await findPokemonById(id);
      setPokemon(poke);
    };
    setPokemonByID(pokemonId);
  }, [pokemonId, setPokemon]);
  return (
    <div className="container-fluid rm-large-pokemon">
      {pokemon && (
        <div>
          <div className="rm-pokemon-name text-nowrap">{pokemon.name}</div>
          <div className="row flex-nowrap">
            <div className="col-auto">
              <img
                src={pokemon.sprites.large}
                alt={pokemon.name}
                className="rm-pokemon-image m-0"
              />
              {/* TODO: make the types pretty plz, they bland */}
              <div className="rm-pokemon-info">
                Types:{" "}
                {pokemon.types.map((type) => (
                  <span key={type} className="rm-pokemon-info">
                    {type}{" "}
                  </span>
                ))}
              </div>
              {/* any other fields we want to list here??? maybe evolution tree*/}
            </div>
            <div className="col">
              {listedPokemon.map((listing) => (
                <Listing key={listing.listingId} listing={listing} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default LargePokemon;
