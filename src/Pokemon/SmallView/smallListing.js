import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getDateString } from "../../Utils/date-utils";
import { findPokemonById } from "../../Utils/client";
import { findTransactionById } from "../../Utils/Transactions/client";
import { useNavigate } from "react-router";

const ProfileListing = ({ transactionId }) => {
  const [listing, setListing] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const purchase = () => {
    console.log("purchased listing: ", listing._id);
  };

  useEffect(() => {
    findTransactionById(transactionId).then((transaction) => {
  setListing(transaction);  
      findPokemonById(transaction.pokemonId).then((pok) => {
        setPokemon(pok);
      });
    });
  }, [transactionId]);

  return (
    listing &&
    pokemon && (
      <div
        className="rm-profile-listing"
        onClick={() => {
          // make this navigate to transaction page for pokemon?
          navigate("/pokemon/transaction/" + transactionId);
        }}
      >
        <div className="row">
          <div className="col-auto">
            <img
              className="rm-listing-img"
              src={pokemon ? pokemon.sprites.small : ""}
              alt="img"
            />
          </div>
          <div className="col">
            <h3>{pokemon.name}</h3>
            <p>listed on: {getDateString(listing.timeOfListing)}</p>
            {listing.buyerId && (
              <p>purchased on: {getDateString(listing.timeOfPurchase)}</p>
            )}
            <div className="row flex-nowrap">
              <div className="col">
                <h3>Price: {listing.price}</h3>
              </div>
              <div className="col-auto">
                {/* TODO: override button styles */}
                {!listing.buyerId && (
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    purchase()}} variant="primary">
                    Purchase
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileListing;
