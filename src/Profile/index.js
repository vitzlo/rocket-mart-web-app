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
  findTransactionByBuyerId,
  findTransactionBySellerId,
  purchaseTransactionById,
} from "../Utils/Transactions/client";
import * as client from "../Utils/Users/client";

function Profile({ user, setUser }) {
  const { userId } = useParams();
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
    if (userId) {
      if (user && user._id === userId) {
        navigate("/profile");
      } else {
        client.findUserById(userId).then((data) => setAccount(data));
      }
    } else {
      setAccount(user);
    }
  }, [userId, user, navigate]);

  useEffect(() => {
    if (account) {
      findTransactionByBuyerId(account._id).then((results) =>
        setPurchased(results)
      );
      findTransactionBySellerId(account._id).then((results) => {
        setSold(results.filter((transaction) => transaction.buyerId));
        setListed(results.filter((transaction) => !transaction.buyerId));
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
            {!userId && (
              <button className="btn w-100 btn-danger" onClick={signout}>
                Sign out
              </button>
            )}
            {userId && user && (
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
                  {purchased && <ProfileListingList listings={purchased} />}
                </div>
              </Tab>

              {account.type === "SELLER" && (
                <Tab eventKey="listed" title="Listed Pokémon">
                  {listed && (
                    <ProfileListingList
                      listings={listed}
                      editable={!userId}
                      buyable={userId}
                      pressPurchase={pressPurchase}
                    />
                  )}
                </Tab>
              )}
              {account.type === "SELLER" && (
                <Tab eventKey="sold" title="Sold Pokémon">
                  {sold && <ProfileListingList listings={sold} />}
                </Tab>
              )}
              <Tab eventKey="reviews" title="Reviews">
                {reviews && <ProfileReviewList reviews={reviews} />}
              </Tab>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
