import ProfileListing from "../Pokemon/SmallView/smallListing";

function ProfileListingList({
  listings,
  buyable,
  editable = false,
  pressPurchase,
  editListing,
  deleteListing,
}) {
  return (
    <div className="p-4 row justify-content-center">
      {listings.map((transaction) => (
        <ProfileListing
          transaction={transaction}
          key={transaction._id}
          pressPurchase={pressPurchase}
          editable={editable}
          buyable={buyable}
          editListing={editListing}
          deleteListing={deleteListing}
        />
      ))}
    </div>
  );
}

export default ProfileListingList;
