import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

/////////////
// HELPERS //
/////////////

/////////////
// PRUNING //
/////////////

const pruneTransaction = (transactionsData) => {
  // convert strings to Date objects in the transaction data
  transactionsData.timeOfListing = new Date(transactionsData.timeOfListing);
  if (transactionsData.buyerId) {
    transactionsData.timeOfPurchase = new Date(transactionsData.timeOfPurchase);
  }
  return transactionsData;
};

/////////////
// EXPORTS //
/////////////

// GET: list of transactions for a given Pokemon by id
export const findTransactionsForPokemon = async (pokemonId) => {
  const response = await axios.get(
    `${API_BASE}/api/transactions/pokemon/${pokemonId}`
  );
  if (!response.data) {
    return [];
  }
  return response.data.map(pruneTransaction);
};
