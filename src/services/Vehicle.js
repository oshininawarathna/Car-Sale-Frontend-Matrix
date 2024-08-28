import axios from 'axios';
import EndPoints from './Endpoints';

// get all vehicle
export const getAllVehicle = async () => {
  const results = await axios.get(EndPoints.vehicle);
  return results;
};

// get vehicle
export const getVehicle = async (id) => {
  const results = await axios.get(`${EndPoints.vehicle}/${id}`);
  return results;
};

// delete vehicle

export const removeVehicle = async (id) => {
  const result = await axios.delete(`${EndPoints.vehicle}/${id}`);
  return result;
};

// create vehicle

export const createVehicle = async (data, config) => {
  const results = await axios.post(EndPoints.vehicle, data, config);
  return results;
};

// update vehicle

export const updateVehi = async (id, data) => {
  const results = await axios.put(`${EndPoints.vehicle}/${id}`, data);
  return results;
};
