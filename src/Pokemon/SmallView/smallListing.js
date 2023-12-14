import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getDateString } from "../../Utils/date-utils";
import { findPokemonById } from "../../Utils/PokeAPI/client";
import { useNavigate } from "react-router";

const ProfileListing = ({
  transaction,
  pressPurchase,
  editable = false,
  buyable,
}) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    findPokemonById(transaction.pokemonId).then((pok) => {
      setPokemon(pok);
    });
  }, [transaction]);

  return (
    pokemon && (
      <div
        className="rm-profile-listing"
        onClick={() => {
          navigate("/pokemon/transaction/" + transaction._id);
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
            <p>listed on: {getDateString(transaction.timeOfListing)}</p>
            {transaction.buyerId && (
              <p>purchased on: {getDateString(transaction.timeOfPurchase)}</p>
            )}
            <div className="row flex-nowrap">
              <div className="col">
                <h3>Price: {transaction.price}</h3>
              </div>
              <div className="col-auto">
                {/* TODO: override button styles */}
                {!transaction.buyerId && buyable && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      pressPurchase(transaction);
                    }}
                    variant="primary"
                  >
                    Purchase
                  </Button>
                )}
                {editable && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("editing");
                    }}
                    variant="primary"
                  >
                    Edit
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
