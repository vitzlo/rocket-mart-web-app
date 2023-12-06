import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findPokemonById } from "../../Utils/client";
import Listing from "./listing";
import { findTransactionsForPokeon } from "../../Utils/Transactions/client";

function LargePokemon() {
  const [pokemon, setPokemon] = useState(undefined);
  const [listedPokemon, setListedPokemon] = useState([]);
  const { pokemonId } = useParams();

  // TODOS:
  // maybe add evolution chain as data shown?
  // add a button to list the pokemon
  // add a button to go back to the search results??? (might be tough bc we need history)

  useEffect(() => {
    const setPokemonByID = async (id) => {
      const poke = await findPokemonById(id);
      setPokemon(poke);
      // sets the transactions for pokemon
      const listed = await findTransactionsForPokeon(id);
      setListedPokemon(listed);
    };
    setPokemonByID(pokemonId);
  }, [pokemonId, setPokemon]);
  return (
    <div className="container-fluid rm-large-pokemon">
      {pokemon && (
        <div>
          <div className="rm-pokemon-name text-nowrap">
            {pokemon.name.replaceAll("-", " ")}
          </div>
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
            {/* change this condition to show something else */}
            {!listedPokemon.length && <h1>NO POKEMON LISTED</h1>}
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
