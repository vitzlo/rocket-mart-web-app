import { useParams, useNavigate } from "react-router-dom";
import { getDateString } from "../Utils/date-utils";
import { useEffect, useState } from "react";
import {
  findTransactionByBuyerName,
  findTransactionBySellerName,
  purchaseTransactionById,
} from "../Utils/Transactions/client";
import * as client from "../Utils/Users/client";
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

function Profile({ user, setUser }) {
  const { username } = useParams();
  const [account, setAccount] = useState(null);
  // lists of transactions
  const [purchased, setPurchased] = useState();
  const [listed, setListed] = useState([]);
  const [sold, setSold] = useState([]);
  // user reviews
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState(null);
  // review modal
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const signout = async () => {
    await client.signout();
    setAccount(null);
    setUser(null);
    navigate("/home");
  };

  const purchaseListing = async (id) => {
    const purchase = await purchaseTransactionById(id);
    setListed(listed.filter((transaction) => transaction._id !== id));
    setSold([...sold, purchase]);
    console.log(purchase);
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
      client.findUserByName(username).then((data) => setAccount(data));
    } else {
      setAccount(user);
    }
  }, [username, user]);

  useEffect(() => {
    if (account) {
      findTransactionByBuyerName(account.username).then((results) =>
        setPurchased(results)
      );
      findTransactionBySellerName(account.username).then((results) => {
        setSold(results.filter((transaction) => transaction.buyer));
        setListed(results.filter((transaction) => !transaction.buyer));
      });
      findUserReviewBySubject(account.username).then((results) => {
        setReviews(results);
        setReview(user && results.find((r) => r.reviewer === user.username));
      });
    }
  }, [account, user]);

  return (
    <div className="container-fluid">
      <UserReviewModal
        show={showModal}
        handleClose={() => setShowModal(false)}
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
                onClick={() => setShowModal(true)}
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
                      editable={!username}
                      buyable={username}
                      purchaseListing={purchaseListing}
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
