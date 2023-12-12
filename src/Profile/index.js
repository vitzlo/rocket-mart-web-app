import { useParams, useNavigate } from "react-router-dom";
import { getDateString } from "../Utils/date-utils";
import { useEffect, useState } from "react";
import {
  findTransactionByBuyerId,
  findTransactionBySellerId,
  purchaseTransactionById,
} from "../Utils/Transactions/client";
import ProfileListing from "../Pokemon/SmallView/smallListing";
import * as client from "../Utils/Users/client";

function Profile({ user, setUser }) {
  const { userId } = useParams();
  const [purchased, setPurchased] = useState();
  const [listed, setListed] = useState([]);
  const [sold, setSold] = useState([]);
  const [account, setAccount] = useState(null);
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

  useEffect(() => {
    if (userId) {
      client.findUserById(userId).then((data) => setAccount(data));
    } else {
      setAccount(user);
    }
  }, [userId, user]);

  useEffect(() => {
    if (account) {
      findTransactionByBuyerId(account._id).then((results) =>
        setPurchased(results)
      );
      findTransactionBySellerId(account._id).then((results) => {
        setSold(results.filter((transaction) => transaction.buyerId));
        setListed(results.filter((transaction) => !transaction.buyerId));
      });
    }
  }, [account]);

  return (
    <div className="container-fluid">
      <div className="row mx-2">
        <div className="col-auto">
          <img
            src={
              (account && account.pfp) ||
              "https://www.svgrepo.com/show/135058/circle-outline.svg"
            }
            alt="pfp icon"
            id="rm-profile-picture"
          />
          <div>{account && `@${account.username} | ${account.region}`}</div>
          <div className="rm-private-both">
            <div>{account && account.email}</div>
          </div>
          <div>{account && `Joined ${getDateString(account.signUpDate)}`}</div>
        </div>
        <div className="col">
          {account && account.type === "BUYER" && purchased && (
            <div>
              <h1 className="rm-private-buyer">[BUYER] Purchased Pokémon</h1>
              {purchased.map((transaction) => (
                <ProfileListing
                  transactionId={transaction._id}
                  key={transaction._id}
                  purchaseListing={purchaseListing}
                  editable={false}
                />
              ))}
            </div>
          )}
          {account && account.type === "SELLER" && listed && (
            <div>
              <h1 className="rm-private-seller">[SELLER] Listed Pokémon</h1>
              {listed.map((transaction) => (
                <ProfileListing
                  transactionId={transaction._id}
                  key={transaction._id}
                  purchaseListing={purchaseListing}
                  editable={!userId}
                  buyable={userId}
                />
              ))}
            </div>
          )}
          {account && account.type === "SELLER" && sold && (
            <div>
              <h1 className="rm-private-seller">[SELLER] Sold Pokémon</h1>
              {sold.map((transaction) => (
                <ProfileListing
                  transactionId={transaction._id}
                  key={transaction._id}
                  purchaseListing={purchaseListing}
                  editable={false}
                />
              ))}
            </div>
          )}
          <button className="btn w-100 btn-danger" onClick={signout}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
