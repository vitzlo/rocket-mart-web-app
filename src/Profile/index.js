import { Link } from "react-router-dom";
import { getDateString } from "../Utils/date-utils";
import "../index.css";
import { useEffect, useState } from "react";
import { findUserById } from "../Utils/Users/client";
import { findFilteredTransactions } from "../Utils/Transactions/client";
import Listing from "../Pokemon/LargeView/listing";

function Profile() {
  const [user, setUser] = useState();
  const [purchased, setPurchased] = useState();
  const [listed, setListed] = useState([]);
  const [sold, setSold] = useState([]);

  useEffect(() => {
    // const setUserByID = async (id) => {
    //   const u = await findUserById(id);
    //   setUser(u);
    // };

    // setUserByID("656df74b113db7c889459d0c");
    setUser(undefined);

    // TODO: current user that is logged in
    // "656df74b113db7c889459d0c" / "656df74b113db7c889459d0d"
    findUserById("656df74b113db7c889459d0c").then((result) => {
      setUser(result);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setPurchased([]);
      setListed([]);
      setSold([]);

      const isPurchased = (transaction) => transaction.buyerId === user._id;
      findFilteredTransactions(isPurchased).then((results) =>
        setPurchased(results)
      );

      const isListed = (transaction) =>
        transaction.sellerId === user._id && !transaction.buyerId;
      findFilteredTransactions(isListed).then((results) => setListed(results));

      const isSold = (transaction) =>
        transaction.sellerId === user._id && transaction.buyerId;
      findFilteredTransactions(isSold).then((results) => setSold(results));
    }
  }, [user]);

  return (
    <div className="row">
      <div className="col-6 col-sm-6">
        <img
          src="https://www.svgrepo.com/show/135058/circle-outline.svg"
          alt="pfp icon"
          id="rm-profile-picture"
        />
        <div>{user && `@${user.username} | ${user.region}`}</div>
        <div className="rm-private-both">
          <div>{user && user.email}</div>
        </div>
        <div>{user && `Joined ${getDateString(user.signUpDate)}`}</div>
      </div>
      <div className="col-6 col-sm-6">
        {user && user.type === "BUYER" && purchased && (
          <div>
            <h1 className="rm-private-buyer">[BUYER] Purchased Pokémon</h1>
            {purchased.map((transaction) => (
              <Listing listing={transaction} isSold={true} />
            ))}
          </div>
        )}
        {user && user.type === "SELLER" && listed && (
          <div>
            <h1 className="rm-private-seller">[SELLER] Listed Pokémon</h1>
            {listed.map((transaction) => (
              <Listing listing={transaction} isSold={false} />
            ))}
          </div>
        )}
        {user && user.type === "SELLER" && sold && (
          <div>
            <h1 className="rm-private-seller">[SELLER] Sold Pokémon</h1>
            {sold.map((transaction) => (
              <Listing listing={transaction} isSold={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
