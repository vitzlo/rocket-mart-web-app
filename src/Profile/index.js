import { useParams, useNavigate } from "react-router-dom";
import { getDateString } from "../Utils/date-utils";
import { useEffect, useState } from "react";
import {
  findTransactionByBuyerId,
  findTransactionBySellerId,
  purchaseTransactionById,
} from "../Utils/Transactions/client";
import * as client from "../Utils/Users/client";
import { Tab, Tabs } from "react-bootstrap";
import ProfileListingList from "./profileListingList";
import { blankPfpPath, pfpPathToSvg } from "../Utils/pfp-utils";

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
      {account && (
        <div className="row justify-content-center mx-2">
          <div className="col-auto mb-4">
            <img
              src={
                account.pfp ? pfpPathToSvg[account.pfp] : blankPfpPath
              }
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
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
