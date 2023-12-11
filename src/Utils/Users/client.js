import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
const BASE_API = process.env.REACT_APP_API_BASE;

export const USERS_API = `${BASE_API}/api/users`;

/////////////
// HELPERS //
/////////////

/////////////
// PRUNING //
/////////////

const pruneUser = (userData) => {
  // convert strings to Date objects in the user data
  userData.signUpDate = new Date(userData.signUpDate);
  return userData;
};

/////////////
// EXPORTS //
/////////////

export const signin = async (credentials) => {
  const response = await request.post(`${USERS_API}/signin`, credentials);
  if (!response.data) {
    return undefined;
  }
  return pruneUser(response.data);
};

export const signup = async (credentials) => {
  const response = await request.post(`${USERS_API}/signup`, credentials);
  if (!response.data) {
    return undefined;
  }
  return pruneUser(response.data);
};

export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};

export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  if (!response.data) {
    return undefined;
  }
  return pruneUser(response.data);
};

export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return pruneUser(response.data);
};

export const deleteUser = async (user) => {
  const response = await request.delete(`${USERS_API}/${user._id}`);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await axios.get(`${BASE_API}/api/users/${id}`);
  if (!response.data) {
    return undefined;
  }
  return pruneUser(response.data);
};
