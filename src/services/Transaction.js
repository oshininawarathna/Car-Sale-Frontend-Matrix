import axios from 'axios';
import EndPoints from './Endpoints';

// get all transactions data
export const getAllTransaction = async () => {
  const results = await axios.get(EndPoints.transaction);
  return results;
};

export const deleteTransaction = async (id, brand) => {
  const results = await axios.delete(`${EndPoints.transaction}/${id}`);
  return results;
};

export const createTransaction = async (data) => {
  const results = await axios.post(EndPoints.transaction, data);
  return results;
};

// get Transaction
export const getTransaction = async (id) => {
  const results = await axios.get(`${EndPoints.transaction}/${id}`);
  return results;
};
