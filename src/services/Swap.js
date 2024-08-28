import axios from 'axios';
import EndPoints from './Endpoints';

// get all swapVehicle data
export const getAllSwapVehicle = async () => {
  const results = await axios.get(EndPoints.swapvehicle);
  return results;
};

export const deleteSwap = async (id, name) => {
  const results = await axios.delete(`${EndPoints.swapvehicle}/${id}`);
  return results;
};
