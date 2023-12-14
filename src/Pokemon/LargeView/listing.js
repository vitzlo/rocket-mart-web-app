import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getDateString } from "../../Utils/date-utils";

const Listing = ({ listing, pressPurchase }) => {
  return (
    <div className="rm-listing">
      <div className="row">
        <h4>Listing</h4>
        <div className="col-auto">
          <p>List Date:</p>
          <p>Sold by: </p>
          {listing.buyer && (
            <>
              <p>Purchased On:</p>
              <p>Purchased By:</p>
            </>
          )}
        </div>
        <div className="col-auto" style={{ marginBottom: "10px" }}>
          <p> {getDateString(listing.timeOfListing)}</p>
          <Link to={`/profile/${listing.seller}`}><p>{listing.seller}</p></Link>
          {listing.buyer && (
            <>
              <p>{getDateString(listing.timeOfPurchase)}</p>
              <Link to={`/profile/${listing.buyer}`}><p>{listing.buyer}</p></Link>
            </>
          )}
        </div>
        <div>{/* make this link to buyer profile page? */}</div>
      </div>
      <div className="row">
        <h4>Information</h4>
        <div className="col-auto">
          <p>Height:</p>
          <p>Weight:</p>
          <p>IV:</p>
        </div>
        <div className="col">
          <p> {listing.height} m</p>
          <p> {listing.weight} kg</p>
          <p>{listing.iv}</p>
        </div>
      </div>
      <div className="row flex-nowrap" style={{ marginTop: "10px" }}>
        <div className="col">
          <h3>${listing.price}</h3>
        </div>
        <div className="col-auto">
          {/* TODO: override button styles */}
          {!listing.buyer && (
            <Button
              onClick={() => pressPurchase(listing)}
              variant="primary"
            >
              Purchase
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
