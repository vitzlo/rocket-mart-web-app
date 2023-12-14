const ProfileReview = ({ review }) => {
  return (
    <div className="rm-profile-review">
      <div> {review.reviewer} </div>
      <div>{review.stars}</div>
      <div>{review.review}</div>
    </div>
  );
};

export default ProfileReview;
