import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import ProfileListingList from "./profileListingList";
import { blankPfpPath, pfpPathToSvg } from "../Utils/pfp-utils";
import {
  createUserReview,
  deleteUserReviewById,
  findUserReviewBySubject,
  updateUserReview,
} from "../Utils/UserReviews/client";
import ProfileReviewList from "./profileReviewList";
import UserReviewModal from "./userReviewModal";
import User from "../SignIn";
import { getDateString } from "../Utils/date-utils";
import PurchaseModal from "../Utils/Components/purchase";
import {
  findTransactionByBuyerName,
  findTransactionBySellerName,
  purchaseTransactionById,
} from "../Utils/Transactions/client";
import * as client from "../Utils/Users/client";
import { meowth_spin } from "../Utils/loading";

function Profile({ user, setUser }) {
  const { username } = useParams();
  // display user + transactions
  const [account, setAccount] = useState(null);
  const [purchased, setPurchased] = useState();
  const [listed, setListed] = useState([]);
  const [sold, setSold] = useState([]);
  // login modal
  const [loginModalShow, setLoginModalShow] = useState(false);
  // purchase modal
  const [purchaseModalShow, setPurchaseModalShow] = useState(false);
  const [selectedListing, setSelectedListing] = useState(undefined);
  // user reviews
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState(null);
  // review modal
  const [reviewModalShow, setReviewModalShow] = useState(false);
  const navigate = useNavigate();
  // loading
  const [loading, setLoading] = useState(true);

  const signout = async () => {
    await client.signout();
    setAccount(null);
    setUser(null);
    navigate("/home");
  };

  const pressPurchase = async (transaction) => {
    if (user) {
      await setSelectedListing(transaction);
      setPurchaseModalShow(true);
    } else {
      setLoginModalShow(true);
    }
  };

  const purchase = async (id) => {
    const purchase = await purchaseTransactionById(id);
    setListed(listed.filter((transaction) => transaction._id !== id));
    setSold([...sold, purchase]);
    setPurchaseModalShow(false);
  };

  const createReview = async (reviewBody) => {
    // create a new review
    const newReview = await createUserReview({
      ...reviewBody,
      reviewer: user.username,
      subject: account.username,
    });
    setReviews([...reviews, newReview]);
    setReview(newReview);
  };

  const editReview = async (reviewBody) => {
    // update the existing review
    const newReview = {
      ...review,
      ...reviewBody,
    };
    updateUserReview(newReview);
    setReviews([...reviews.filter((r) => r._id !== review._id), newReview]);
    setReview(newReview);
  };

  const deleteReview = async () => {
    // delete the existing review
    deleteUserReviewById(review._id);
    setReviews(reviews.filter((r) => r._id !== review._id));
    setReview(null);
  };

  useEffect(() => {
    if (username) {
      if (user && user.username === username) {
        navigate("/profile");
      } else {
        client.findUserByName(username).then((data) => setAccount(data));
      }
    } else {
      setAccount(user);
    }
  }, [username, user, navigate]);

  useEffect(() => {
    if (account) {
      setLoading(true);
      findTransactionByBuyerName(account.username).then((results) =>
        setPurchased(results)
      );
      findTransactionBySellerName(account.username).then((results) => {
        setSold(results.filter((transaction) => transaction.buyer));
        setListed(results.filter((transaction) => !transaction.buyer));
        setLoading(false);
      });
      findUserReviewBySubject(account.username).then((results) => {
        setReviews(results);
        setReview(user && results.find((r) => r.reviewer === user.username));
      });
    }
  }, [account, user]);

  return (
    <div className="container-fluid">
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
      <UserReviewModal
        show={reviewModalShow}
        handleClose={() => setReviewModalShow(false)}
        review={review}
        createReview={createReview}
        editReview={editReview}
        deleteReview={deleteReview}
      />
      {account && (
        <div className="row justify-content-center mx-2">
          <div className="col-auto mb-4">
            <img
              src={account.pfp ? pfpPathToSvg[account.pfp] : blankPfpPath}
              alt="pfp icon"
              id="rm-profile-picture"
            />
            <div className="text-center">
              <div>{`@${account.username} | ${account.region}`}</div>
              <div className="rm-private-both">{account.email}</div>
              <div>{`Joined ${getDateString(account.signUpDate)}`}</div>
            </div>
            {!username && (
              <button className="btn w-100 btn-danger" onClick={signout}>
                Sign out
              </button>
            )}
            {username && user && (
              <button
                className="btn w-100 btn-primary"
                onClick={() => setReviewModalShow(true)}
              >
                {review ? "Edit your review" : "Leave a review"}
              </button>
            )}
          </div>
          <div className="row mx-2">
            <Tabs
              justify
              defaultActiveKey={account.type === "SELLER" ? "listed" : "bought"}
            >
              <Tab eventKey="bought" title="Purchased Pokémon">
                <div>
                  {loading ? (
                    <div className="text-center">
                      <h3>Loading...</h3>
                      <img
                        src={meowth_spin}
                        alt="loading"
                        className="rm-loading-image"
                      />
                    </div>
                  ) : purchased?.length ? (
                    <ProfileListingList listings={purchased} />
                  ) : (
                    <h2>No Pokemon Bought</h2>
                  )}
                </div>
              </Tab>

              {account.type === "SELLER" && (
                <Tab eventKey="listed" title="Listed Pokémon">
                  <div>
                    {loading ? (
                      <div className="text-center">
                        <h3>Loading...</h3>
                        <img
                          src={meowth_spin}
                          alt="loading"
                          className="rm-loading-image"
                        />
                      </div>
                    ) : listed?.length ? (
                      <ProfileListingList
                        listings={listed}
                        editable={!username}
                        buyable={username}
                        pressPurchase={pressPurchase}
                      />
                    ) : (
                      <h2>No Pokemon Listed</h2>
                    )}
                  </div>
                </Tab>
              )}
              {account.type === "SELLER" && (
                <Tab eventKey="sold" title="Sold Pokémon">
                  <div>
                    {loading ? (
                      <div className="text-center">
                        <h3>Loading...</h3>
                        <img
                          src={meowth_spin}
                          alt="loading"
                          className="rm-loading-image"
                        />
                      </div>
                    ) : sold?.length ? (
                      <ProfileListingList listings={sold} />
                    ) : (
                      <h2>No Pokemon Sold</h2>
                    )}
                  </div>
                </Tab>
              )}
              <Tab eventKey="reviews" title="Reviews">
                <div>
                  {loading ? (
                    <div className="text-center">
                      <h3>Loading...</h3>
                      <img
                        src={meowth_spin}
                        alt="loading"
                        className="rm-loading-image"
                      />
                    </div>
                  ) : reviews?.length ? (
                    <ProfileReviewList reviews={reviews} />
                  ) : (
                    <h2>No reviews</h2>
                  )}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
