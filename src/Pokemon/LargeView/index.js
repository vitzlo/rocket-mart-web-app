import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findPokemonById } from "../../Utils/client";
import Listing from "./listing";
import {
  findTransactionById,
  findTransactionsForPokemon,
} from "../../Utils/Transactions/client";
import PokemonTypes from "./Types/pokemonTypes";
import { updateRecentlyViewed } from "../../Utils/Users/client";

function LargePokemon({ setUser }) {
  const [pokemon, setPokemon] = useState(undefined);
  const [listing, setListing] = useState(undefined);
  const [listedPokemon, setListedPokemon] = useState([]);
  const { pokemonId, transactionId } = useParams();
  // TODOS:
  // maybe add evolution chain as data shown?
  // add a button to list the pokemon
  // add a button to go back to the search results??? (might be tough bc we need history)

  useEffect(() => {
    const setPokemonByID = async (id) => {
      const poke = await findPokemonById(id);
      setPokemon(poke);
      setUser(await updateRecentlyViewed(id));
      // sets the transactions for pokemon
      const listed = await findTransactionsForPokemon(id);
      // filter out sold pokemon
      let unsold = listed.filter((listing) => !listing.buyerId);
      if (transactionId) {
        setListedPokemon(
          unsold.filter((listing) => listing._id !== transactionId)
        );
      } else {
        setListedPokemon(unsold);
      }
    };
    const setPokemonByTransactionID = async (id) => {
      const transaction = await findTransactionById(id);
      setListing(transaction);
      setPokemonByID(transaction.pokemonId);
    };
    if (transactionId) {
      setPokemonByTransactionID(transactionId);
    } else {
      setPokemonByID(pokemonId);
    }
  }, [pokemonId, transactionId, setUser]);

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
              {/* <div className="rm-pokemon-info">
                Types:{" "}
                {pokemon.types.map((type) => (
                  <span key={type} className="rm-pokemon-info">
                    {type}{" "}
                  </span>
                ))}
              </div> */}
              <PokemonTypes types={pokemon.types} />
              {/* any other fields we want to list here??? maybe evolution tree*/}
            </div>
            <div className="col">
              {listing &&
                (listing.buyerId ? (
                  <div>
                    <h1>Sold Listing</h1>
                    <Listing listing={listing} />
                    <h1>Other Listings</h1>
                  </div>
                ) : (
                  <div>
                    <h1>Your Listing</h1>
                    <Listing listing={listing} />
                    <h1>Other Listings</h1>
                  </div>
                ))}
              {/* change this condition to show something else */}
              {!listedPokemon.length && (
                <h1>{listing ? "NO OTHER LISTINGS" : "NO LISTINGS"}</h1>
              )}
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
