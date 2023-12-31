import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findPokemonById } from "../../Utils/PokeAPI/client";
import Listing from "./listing";
import User from "../../SignIn";
import {
  createTransaction,
  deleteTransactionById,
  editTransactionById,
  findTransactionById,
  findTransactionsForPokemon,
  purchaseTransactionById,
} from "../../Utils/Transactions/client";
import PokemonTypes from "./Types/pokemonTypes";
import { updateRecentlyViewed } from "../../Utils/Users/client";
import { meowth_spin } from "../../Utils/loading";
import PurchaseModal from "../../Utils/Components/purchase";
import ListingModal from "../../Utils/Components/listingModal";

function LargePokemon({ user, setUser }) {
  const { pokemonId, transactionId } = useParams();
  // display pokemon + transactions
  const [pokemon, setPokemon] = useState(undefined);
  const [listing, setListing] = useState(undefined);
  const [listedPokemon, setListedPokemon] = useState([]);
  // login modal
  const [loginModalShow, setLoginModalShow] = useState(false);
  // for purchasing or editing listings
  const [selectedListing, setSelectedListing] = useState(undefined);
  const [purchaseModalShow, setPurchaseModalShow] = useState(false);
  const [transactionModalShow, setTransactionModalShow] = useState(false);
  // loading
  const [loading, setLoading] = useState(true);
  // TODOS:
  // maybe add evolution chain as data shown?

  const updateListingsList = async (newListing) => {
    setListing(newListing);
    const listed = await findTransactionsForPokemon(pokemon.id);
    let unsold = listed.filter((listing) => !listing.buyer);
    setListedPokemon(
      unsold.filter((listing) => listing._id !== newListing._id)
    );
  };

  const purchase = async (id) => {
    const purchase = await purchaseTransactionById(id);
    updateListingsList(purchase);
    setPurchaseModalShow(false);
  };

  const pressPurchase = async (transaction) => {
    if (user) {
      await setSelectedListing(transaction);
      setPurchaseModalShow(true);
    } else {
      setLoginModalShow(true);
    }
  };

  const listPokemon = async () => {
    if (user && user.type === "SELLER") {
      setTransactionModalShow(true);
    }
  };

  const pressEdit = async (transaction) => {
    if (user && user.type === "SELLER") {
      await setSelectedListing(transaction);
      setPurchaseModalShow(false);
      setTransactionModalShow(true);
    }
  };

  const createListing = async (data) => {
    if (user && user.type === "SELLER") {
      const transaction = await createTransaction({
        ...data,
        pokemonId: pokemon.id,
      });
      updateListingsList(transaction);
    }
    setTransactionModalShow(false);
    setSelectedListing(undefined);
  };

  const editListing = async (data) => {
    if (user && user.type === "SELLER") {
      editTransactionById(selectedListing._id, {
        ...data,
        seller: user.username,
      });
      if (listing && listing._id === selectedListing._id) {
        setListing({ ...listing, ...data });
      } else {
        updateListingsList({ ...selectedListing, ...data });
      }
    }
    setTransactionModalShow(false);
    setSelectedListing(undefined);
  };

  const deleteListing = async () => {
    if (user && user.type === "SELLER") {
      deleteTransactionById(selectedListing._id);
      if (listing && listing._id === selectedListing._id) {
        setListing(undefined);
      } else {
        setListedPokemon(
          listedPokemon.filter((listing) => listing._id !== selectedListing._id)
        );
      }
    }
    setTransactionModalShow(false);
    setSelectedListing(undefined);
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
      let unsold = listed.filter((listing) => !listing.buyer);
      if (transactionId) {
        setListedPokemon(
          unsold.filter((listing) => listing._id !== transactionId)
        );
      } else {
        setListedPokemon(unsold);
      }
      setLoading(false);
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
        onHide={() => {
          setPurchaseModalShow(false);
          setSelectedListing(undefined);
        }}
        transaction={selectedListing}
        purchase={purchase}
        edit={pressEdit}
        user={user}
      />
      <ListingModal
        show={transactionModalShow}
        onHide={() => {
          setTransactionModalShow(false);
          setSelectedListing(undefined);
        }}
        pokemon={pokemon}
        listing={selectedListing}
        createListing={createListing}
        editListing={editListing}
        deleteListing={deleteListing}
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
                {user && user.type === "SELLER" && !loading && (
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
              {!loading &&
                listing &&
                (listing.buyer ? (
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
              {!loading && !listedPokemon.length && (
                <h3>{listing ? "No other listings" : "No listings"}</h3>
              )}
              {loading ? (
                <div className="text-center">
                  <h3>Loading...</h3>
                  <img
                    src={meowth_spin}
                    alt="loading"
                    className="rm-loading-image"
                  />
                </div>
              ) : (
                listedPokemon.map((listing) => (
                  <Listing
                    key={listing.listingId}
                    listing={listing}
                    pressPurchase={pressPurchase}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LargePokemon;
