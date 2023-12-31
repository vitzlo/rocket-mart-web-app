import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function ListingModal({
  show,
  onHide,
  pokemon,
  listing,
  createListing,
  editListing,
  deleteListing,
}) {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [iv, setIv] = useState(0);
  const [price, setPrice] = useState(0);

  const handleButton = () => {
    if (listing) {
      editListing({ weight, height, iv, price });
    } else {
      createListing({ weight, height, iv, price });
    }
    onHide();
  };
  const handleDelete = () => {
    if (listing) {
      deleteListing();
      onHide();
    }
  };

  useEffect(() => {
    if (listing) {
      setWeight(listing.weight);
      setHeight(listing.height);
      setIv(listing.iv);
      setPrice(listing.price);
    } else {
      setWeight(pokemon?.weight || 0);
      setHeight(pokemon?.height || 0);
      setIv(15);
    }
  }, [listing, pokemon]);

  return (
    <Modal
      className="rm-listing-modal"
      size="md"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>
          {listing ? "Edit" : "Create"} Listing for{" "}
          <span className="rm-capitalize">
            {pokemon && pokemon.name.replace("-", " ")}
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label for="weight-input">Weight (kg)</label>
          <input
            className="form-control mb-2"
            id="weight-input"
            type="number"
            min="0"
            value={weight}
            placeholder={pokemon && pokemon.weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label for="height-input">Height (m)</label>
          <input
            className="form-control mb-2"
            id="height-input"
            type="number"
            min="0"
            value={height}
            placeholder={pokemon && pokemon.height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <label for="iv-input">IV (0-31)</label>
          <input
            className="form-control mb-2"
            id="iv-input"
            type="number"
            min="0"
            max="31"
            value={iv}
            placeholder="15"
            onChange={(e) => setIv(e.target.value)}
          />
        </div>
        <div>
          <label for="price-input">Price ($)</label>
          <input
            className="form-control mb-2"
            id="price-input"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mt-4">
          {listing && (
            <button className="btn btn-danger me-2" onClick={handleDelete}>
              Delete
            </button>
          )}
          <button className="btn btn-primary float-end" onClick={handleButton}>
            {listing ? "Save" : "Create"}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ListingModal;
