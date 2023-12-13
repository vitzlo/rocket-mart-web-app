import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findPokemonById } from "../../Utils/client";
import Listing from "./listing";
import User from "../../SignIn";
import {
  createTransaction,
  findTransactionById,
  findTransactionsForPokemon,
  purchaseTransactionById,
} from "../../Utils/Transactions/client";
import PokemonTypes from "./Types/pokemonTypes";
import { updateRecentlyViewed } from "../../Utils/Users/client";

function LargePokemon({ user, setUser }) {
  const [pokemon, setPokemon] = useState(undefined);
  const [listing, setListing] = useState(undefined);
  const [listedPokemon, setListedPokemon] = useState([]);
  const { pokemonId, transactionId } = useParams();
  const [modalShow, setModalShow] = useState(false);
  // TODOS:
  // maybe add evolution chain as data shown?

  const updateListings = async (newListing) => {
    setListing(newListing);
    const listed = await findTransactionsForPokemon(pokemon.id);
    let unsold = listed.filter((listing) => !listing.buyerId);
    console.log("unsold: ", unsold);
    console.log("transaction: ", newListing);
    setListedPokemon(
      unsold.filter((listing) => listing._id !== newListing._id)
    );
  };
  const purchaseListing = async (id) => {
    if (user) {
      const purchase = await purchaseTransactionById(id);
      console.log(purchase);
      updateListings(purchase);
    } else {
      setModalShow(true);
    }
  };
  // add a button to list the pokemon
  const listPokemon = async () => {
    if (user && user.type === "SELLER") {
      // filler data for now
      const transaction = await createTransaction({
        pokemonId: pokemon.id,
        price: Math.random() * 100 + 50,
        weight: 10,
        height: 10,
        iv: 10,
      });
      updateListings(transaction);
    }
  };
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
      <User
        show={modalShow}
        onHide={() => setModalShow(false)}
        setUser={setUser}
      />
      {pokemon && (
        <div>
          <div className="row">
            <div className="col-auto d-none d-md-block" style={{ position: "fixed" }}>
              <div className="rm-pokemon-name rm-pokemon-left me-0">
                {pokemon.name.replaceAll("-", " ")}
                {user && user.type === "SELLER" && (
                  <div className="float-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        listPokemon();
                      }}
                    >
                      List a pokemon
                    </button>
                  </div>
                )}
              </div>
              <img
                src={pokemon.sprites.large}
                alt={pokemon.name}
                className="rm-pokemon-image m-0"
              />
              <PokemonTypes types={pokemon.types} />
              {/* any other fields we want to list here??? maybe evolution tree*/}
            </div>
            <div className="col-auto rm-pokemon-left d-none d-md-block"></div>
            <div className="col-auto d-md-none">
              <div className="rm-pokemon-name rm-pokemon-left me-0">
                {pokemon.name.replaceAll("-", " ")}
                {user && user.type === "SELLER" && (
                  <div className="float-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        listPokemon();
                      }}
                    > 
                      List a pokemon
                    </button>
                  </div>
                )}
              </div>
              <img
                src={pokemon.sprites.large}
                alt={pokemon.name}
                className="rm-pokemon-image m-0"
              />
              <PokemonTypes types={pokemon.types} />
              {/* any other fields we want to list here??? maybe evolution tree*/}
            </div>
            <div className="col rm-large-listings">
              {listing &&
                (listing.buyerId ? (
                  <div>
                    <h1>Sold Listing</h1>
                    <Listing
                      listing={listing}
                      purchaseListing={purchaseListing}
                    />
                    <h1>Other Listings</h1>
                  </div>
                ) : (
                  <div>
                    <h1>Your Listing</h1>
                    <Listing
                      listing={listing}
                      purchaseListing={purchaseListing}
                    />
                    <h1>Other Listings</h1>
                  </div>
                ))}
              {/* change this condition to show something else */}
              {!listedPokemon.length && (
                <h1>{listing ? "NO OTHER LISTINGS" : "NO LISTINGS"}</h1>
              )}
              {listedPokemon.map((listing) => (
                <Listing
                  key={listing.listingId}
                  listing={listing}
                  purchaseListing={purchaseListing}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LargePokemon;
