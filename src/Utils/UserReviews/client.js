import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const API_BASE = process.env.REACT_APP_API_BASE + "/api/userReviews";

/////////////
// HELPERS //
/////////////

/////////////
// PRUNING //
/////////////

const pruneUserReview = (userReviewData) => {
  userReviewData.timeOfReview = new Date(userReviewData.timeOfReview);

  return userReviewData;
};

/////////////
// EXPORTS //
/////////////

export const createUserReview = async (userReviewData) => {
  const response = await request.post(API_BASE, userReviewData);
  if (!response.data) {
    return undefined;
  }
  return pruneUserReview(response.data);
};

export const updateUserReview = async (userReviewData) => {
  const response = await request.put(
    `${API_BASE}/${userReviewData._id}`,
    userReviewData
  );
  return response.data;
};

export const findUserReviewBySubject = async (subject) => {
  const response = await request.get(`${API_BASE}/subject/${subject}`);
  if (!response.data) {
    return [];
  }
  return response.data.map(pruneUserReview);
};
