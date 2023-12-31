import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { findPokemonById } from "../PokeAPI/client";

function PurchaseModal({ show, onHide, purchase, edit, transaction, user }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (transaction) {
      findPokemonById(transaction.pokemonId).then((data) => setPokemon(data));
    }
  }, [transaction]);

  return (
    <Modal
      className="rm-purchase-modal"
      size="md"
      centered
      onHide={onHide}
      show={show}
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {transaction && pokemon && (
          <div>
            {transaction.seller !== user.username && (
              <>
                <div className="row">
                  <div className="col-6 ps-5">Pokemon</div>
                  <div className="col-6 rm-capitalize">{pokemon.name}</div>
                </div>
                <div className="row">
                  <div className="col-6 ps-5">Seller</div>
                  <div className="col-6">{transaction.seller}</div>
                </div>
                <div className="row">
                  <div className="col-6 ps-5">Height</div>
                  <div className="col-6">{transaction.height} m</div>
                </div>
                <div className="row">
                  <div className="col-6 ps-5">Weight</div>
                  <div className="col-6">{transaction.weight} kg</div>
                </div>
                <div className="row">
                  <div className="col-6 ps-5">IV</div>
                  <div className="col-6">{transaction.iv}</div>
                </div>
                <div className="row mb-4">
                  <div className="col-6 ps-5">Price</div>
                  <div className="col-6">${transaction.price}</div>
                </div>
              </>
            )}
            {transaction.seller === user.username && (
              <div className="row">
                <div className="col">
                  Can't purchase your own Pokemon, would you like to edit?
                </div>
              </div>
            )}
          </div>
        )}
        {transaction && (
          <div className="text-end mt-4">
            {/* make it edit modal if this is the user's listing */}
            {transaction.seller === user.username ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  edit(transaction);
                }}
              >
                Edit Listing
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => purchase(transaction._id)}
              >
                Purchase
              </button>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default PurchaseModal;
