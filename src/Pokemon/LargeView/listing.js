import React from "react";
import { Button } from "react-bootstrap";
import { getDateString } from "../../Utils/date-utils";

const Listing = ({ listing }) => {
  const purchase = () => {
    console.log("purchased listing: ", listing.listingId);
  };
  return (
    <div className="rm-listing">
      <h3>LISTING</h3>
      <p>listed on: {getDateString(listing.timeOfListing)}</p>
      {/* make this link to seller profile page? */}
      <p>by seller: {listing.sellerId}</p>
      <h3>ABOUT</h3>
      <p>height: {listing.pokemon.height}</p>
      <p>weight: {listing.pokemon.weight}</p>
      <div className="row flex-nowrap">
        <div className="col">
          <h3>COST: {listing.cost}</h3>
        </div>
        <div className="col-auto">
          {/* TODO: override button styles */}
          <Button onClick={purchase} variant="primary">
            Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Listing;
