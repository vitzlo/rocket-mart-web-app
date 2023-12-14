import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findPokemonById } from "../../Utils/PokeAPI/client";
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
import PurchaseModal from "../../Utils/Components/purchase";

function LargePokemon({ user, setUser }) {
  const { pokemonId, transactionId } = useParams();
  // display pokemon + transactions
  const [pokemon, setPokemon] = useState(undefined);
  const [listing, setListing] = useState(undefined);
  const [listedPokemon, setListedPokemon] = useState([]);
  // login modal
  const [loginModalShow, setLoginModalShow] = useState(false);
  // for purchasing
  const [selectedListing, setSelectedListing] = useState(undefined);
  const [purchaseModalShow, setPurchaseModalShow] = useState(false);
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

  const purchase = async (id) => {
    const purchase = await purchaseTransactionById(id);
    updateListings(purchase);
    setPurchaseModalShow(false);
  };

  const pressPurchase = async (transaction) => {
    if (user) {
      console.log("press purchase: ", transaction);
      await setSelectedListing(transaction);
      setPurchaseModalShow(true);
    } else {
      setLoginModalShow(true);
    }
  };

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
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
        setUser={setUser}
      />
      <PurchaseModal
        show={purchaseModalShow}
        onHide={() => setPurchaseModalShow(false)}
        transaction={selectedListing}
        purchase={purchase}
        user={user}
      />

      {pokemon && (
        <div>
          <div className="row">
            <div
              className="col-auto d-none d-md-block"
              style={{ position: "fixed" }}
            >
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
                    <Listing listing={listing} pressPurchase={pressPurchase} />
                    <h1>Other Listings</h1>
                  </div>
                ) : (
                  <div>
                    <h1>Your Listing</h1>
                    <Listing listing={listing} pressPurchase={pressPurchase} />
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
                  pressPurchase={pressPurchase}
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
