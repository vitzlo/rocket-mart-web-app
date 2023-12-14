import ProfileReview from "./userReview";

function ProfileReviewList({ reviews }) {
  return (
    <div className="p-4 row">
      {reviews.map((review) => (
        <ProfileReview review={review} key={review._id} />
      ))}
    </div>
  );
}

export default ProfileReviewList;
