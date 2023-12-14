import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getDateString } from "../../Utils/date-utils";
import { findPokemonById } from "../../Utils/PokeAPI/client";
import { useNavigate } from "react-router";
import ListingModal from "../../Utils/Components/listingModal";

const ProfileListing = ({
  transaction,
  pressPurchase,
  editable = false,
  buyable,
  editListing,
  deleteListing,
}) => {
  const [pokemon, setPokemon] = useState(null);
  // editing transaction modal
  const [editTransactionShow, setEditTransactionShow] = useState(false);
  const navigate = useNavigate();

  const callEditListing = async (data) => {
    editListing(transaction._id, data);
    setEditTransactionShow(false);
  };
  const callDeleteListing = async (id) => {
    deleteListing(id);
    setEditTransactionShow(false);
  };

  useEffect(() => {
    findPokemonById(transaction.pokemonId).then((pok) => {
      setPokemon(pok);
    });
  }, [transaction]);

  return (
    pokemon && (
      <>
        <ListingModal
          show={editTransactionShow}
          onHide={() => setEditTransactionShow(false)}
          pokemon={pokemon}
          listing={transaction}
          editListing={callEditListing}
          deleteListing={callDeleteListing}
        />
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
              <h4 className="rm-capitalize">
                {pokemon.name.replace("-", " ")}
              </h4>
              <p>List Date: {getDateString(transaction.timeOfListing)}</p>
              {transaction.buyer && (
                <p style={{ marginTop: "-10px" }}>
                  Purchase Date: {getDateString(transaction.timeOfPurchase)}
                </p>
              )}
              <div className="row flex-nowrap">
                <div className="col">
                  <h4>Price: ${transaction.price}</h4>
                </div>
                <div className="col-auto">
                  {/* TODO: override button styles */}
                  {!transaction.buyer && buyable && (
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
                        setEditTransactionShow(true);
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
      </>
    )
  );
};

export default ProfileListing;
