import axios from 'axios';
import EndPoints from './Endpoints';

// get all Maintenance data
export const getAllMaintenance = async () => {
  const results = await axios.get(EndPoints.maintenance);
  return results;
};
// remove test run
export const removeMaintenance = async (id) => {
  const result = await axios.delete(`${EndPoints.maintenance}/${id}`);
};
