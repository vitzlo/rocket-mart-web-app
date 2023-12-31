import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

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
  if (transactionsData.buyer) {
    transactionsData.timeOfPurchase = new Date(transactionsData.timeOfPurchase);
  }
  transactionsData.price = transactionsData.price.toFixed(2);
  return transactionsData;
};

/////////////
// EXPORTS //
/////////////

// POST: create a new transaction
export const createTransaction = async (transactionData) => {
  const response = await request.post(
    `${API_BASE}/api/transactions`,
    transactionData
  );
  if (!response.data) {
    return undefined;
  }
  return pruneTransaction(response.data);
};

// GET: list of transactions that the given user has listed
export const findTransactionBySellerName = async (seller) => {
  const response = await request.get(
    `${API_BASE}/api/transactions/seller/${seller}`
  );
  if (!response.data) {
    return [];
  }
  return response.data.map(pruneTransaction);
};

// GET: list of transactions that the given user has purchased
export const findTransactionByBuyerName = async (buyer) => {
  const response = await request.get(
    `${API_BASE}/api/transactions/buyer/${buyer}`
  );
  if (!response.data) {
    return [];
  }
  return response.data.map(pruneTransaction);
};

// GET: list of transactions for a given Pokemon by id
export const findTransactionsForPokemon = async (pokemonId) => {
  const response = await request.get(
    `${API_BASE}/api/transactions/pokemon/${pokemonId}`
  );
  if (!response.data) {
    return [];
  }
  return response.data.map(pruneTransaction);
};

// GET: transaction by id
export const findTransactionById = async (id) => {
  const response = await request.get(`${API_BASE}/api/transactions/${id}`);
  if (!response.data) {
    return undefined;
  }
  return pruneTransaction(response.data);
};

export const purchaseTransactionById = async (id) => {
  const response = await request.put(
    `${API_BASE}/api/transactions/purchase/${id}`
  );
  if (!response.data) {
    return undefined;
  }

  return pruneTransaction(response.data);
};

export const deleteTransactionById = async (id) => {
  const response = await request.delete(`${API_BASE}/api/transactions/${id}`);
  if (!response.data) {
    return undefined;
  }

  return pruneTransaction(response.data);
};

export const editTransactionById = async (id, data) => {
  const response = await request.put(
    `${API_BASE}/api/transactions/${id}`,
    data
  );
  if (!response.data) {
    return undefined;
  }

  return pruneTransaction(response.data);
};
