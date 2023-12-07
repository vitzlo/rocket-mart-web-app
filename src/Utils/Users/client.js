import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const pruneUser = (userData) => {
  // convert strings to Date objects in the user data
  userData.signUpDate = new Date(userData.signUpDate);
  return userData;
};

export const findUserById = async (id) => {
  const response = await axios.get(`${API_BASE}/api/users/${id}`);

  if (!response.data) {
    return undefined;
  }

  return pruneUser(response.data);
};
