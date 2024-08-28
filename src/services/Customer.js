import axios from 'axios';
import EndPoints from './Endpoints';

// get all Customer data
export const getAllCustomer = async () => {
  const results = await axios.get(EndPoints.customer);
  return results;
};

// delete Customer

export const deleteCustomer = async (id) => {
  const result = await axios.delete(`${EndPoints.customer}/${id}`);
  return result;
};
