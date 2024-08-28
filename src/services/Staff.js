import axios from 'axios';
import EndPoints from './Endpoints';

// get all Maintenance data
export const getAllStaff = async () => {
  const results = await axios.get(EndPoints.staff);
  return results;
};
