import React from "react";
import { Button } from "react-bootstrap";
import { getDateString } from "../../Utils/date-utils";

const Listing = ({ listing, purchaseListing }) => {
  return (
    <div className="rm-listing">
      <h3>LISTING</h3>
      <p>listed on: {getDateString(listing.timeOfListing)}</p>
      {/* make this link to seller profile page? */}
      <p>by seller: {listing.sellerId}</p>
      {listing.buyerId && (
        <>
          <p>purchased on: {getDateString(listing.timeOfPurchase)}</p>
          <p>by buyer: {listing.buyerId}</p>
        </>
      )}
      {/* make this link to buyer profile page? */}
      <h3>ABOUT</h3>
      <p>height: {listing.height}</p>
      <p>weight: {listing.weight}</p>
      <p>iv: {listing.iv}</p>
      <div className="row flex-nowrap">
        <div className="col">
          <h3>Price: {listing.price}</h3>
        </div>
        <div className="col-auto">
          {/* TODO: override button styles */}
          {!listing.buyerId && (
            <Button onClick={() => purchaseListing(listing._id)} variant="primary">
              Purchase
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
