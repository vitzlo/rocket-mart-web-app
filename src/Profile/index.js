import { useParams, useNavigate} from "react-router-dom";
import { getDateString } from "../Utils/date-utils";
import "../index.css";
import { useEffect, useState } from "react";
import { findUserById } from "../Utils/Users/client";
import { findFilteredTransactions } from "../Utils/Transactions/client";
import Listing from "../Pokemon/LargeView/listing";
import * as client from "../Utils/Users/client";

function Profile() {
  const { id } = useParams();
  const [purchased, setPurchased] = useState();
  const [listed, setListed] = useState([]);
  const [sold, setSold] = useState([]);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const fetchAccount = async () => {
    const user = await client.account();
    setAccount(user);
  };
  const signout = async () => {
    await client.signout();
    navigate("/home");
  };

  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, [id]);
  useEffect(() => {
    if (account) {
      setPurchased([]);
      setListed([]);
      setSold([]);

      const isPurchased = (transaction) => transaction.buyerId === account._id;
      findFilteredTransactions(isPurchased).then((results) =>
        setPurchased(results)
      );

      const isListed = (transaction) =>
        transaction.sellerId === account._id && !transaction.buyerId;
      findFilteredTransactions(isListed).then((results) => setListed(results));

      const isSold = (transaction) =>
        transaction.sellerId === account._id && transaction.buyerId;
      findFilteredTransactions(isSold).then((results) => setSold(results));
    }
  }, [account]);

  return (
    <div>
      <div className="row">
        <div className="col-6 col-sm-6">
          <img
            src="https://www.svgrepo.com/show/135058/circle-outline.svg"
            alt="pfp icon"
            id="rm-profile-picture"
          />
          <div>{account && `@${account.username} | ${account.region}`}</div>
          <div className="rm-private-both">
            <div>{account && account.email}</div>
          </div>
          <div>{account && `Joined ${getDateString(account.signUpDate)}`}</div>
        </div>
        <div className="col-6 col-sm-6">
          {account && account.type === "BUYER" && purchased && (
            <div>
              <h1 className="rm-private-buyer">[BUYER] Purchased Pokémon</h1>
              {purchased.map((transaction) => (
                <Listing listing={transaction} isSold={true} />
              ))}
            </div>
          )}
          {account && account.type === "SELLER" && listed && (
            <div>
              <h1 className="rm-private-seller">[SELLER] Listed Pokémon</h1>
              {listed.map((transaction) => (
                <Listing listing={transaction} isSold={false} />
              ))}
            </div>
          )}
          {account && account.type === "SELLER" && sold && (
            <div>
              <h1 className="rm-private-seller">[SELLER] Sold Pokémon</h1>
              {sold.map((transaction) => (
                <Listing listing={transaction} isSold={true} />
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
