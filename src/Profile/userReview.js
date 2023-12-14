import { Link } from "react-router-dom";

const ProfileReview = ({ review }) => {
  return (
    <div className="rm-profile-review">
      <Link to={`/profile/${review.reviewer}`}><label>{review.reviewer}</label></Link>
      <p>{review.stars} stars</p>
      <div>{review.review}</div>
    </div>
  );
};

export default ProfileReview;
