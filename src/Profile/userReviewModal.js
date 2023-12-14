import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function UserReviewModal({
  show,
  handleClose,
  review,
  createReview,
  editReview,
  deleteReview,
}) {
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(0);

  const create = () => {
    if (review) {
      editReview({ review: reviewText, stars });
    } else {
      createReview({ review: reviewText, stars });
    }
    handleClose();
  };

  useEffect(() => {
    setReviewText(review?.review || "");
    setStars(review?.stars || 0);
  }, [review]);

  return (
    <Modal
      className="rm-profile-review-modal"
      size="md"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label for="review-rating-input">Rating</label>
          <input
            className="form-control mb-2"
            id="review-rating-input"
            type="number"
            min="0"
            max="5"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          />
        </div>
        <div>
          <label for="review-text-input mb-2">Review</label>
          <textarea
            className="form-control"
            id="review-text-input"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <button className="btn btn-primary my-2" onClick={create}>
          Submit
        </button>
        {review && (
          <button
            className="btn btn-warning ms-2 my-2"
            onClick={() => {
              deleteReview();
              handleClose();
            }}
          >
            Delete Review
          </button>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default UserReviewModal;
