import ProfileListing from "../Pokemon/SmallView/smallListing";

function ProfileListingList({
  listings,
  buyable,
  editable = false,
  pressPurchase,
}) {
  return (
    <div className="p-4 row">
      {listings.map((transaction) => (
        <ProfileListing
          transactionId={transaction._id}
          key={transaction._id}
          pressPurchase={pressPurchase}
          editable={editable}
          buyable={buyable}
        />
      ))}
    </div>
  );
}

export default ProfileListingList;
