import axios from 'axios';
import EndPoints from './Endpoints';

// get all Inquiry data
export const getAllVehicleInquiry = async () => {
  const results = await axios.get(EndPoints.vehicleInquiry);
  return results;
};
// remove Inquiry
export const removeVehicleInquiry = async (id) => {
  const result = await axios.delete(`${EndPoints.vehicleInquiry}/${id}`);
};
// get Inquiry
export const getVehicleInquiry = async (id) => {
  const results = await axios.get(`${EndPoints.vehicleInquiry}/${id}`);
  return results;
};
// Update Vehicle Inquiry
export const updateVehicleInquiry = async (id, data) => {
  const results = await axios.put(`${EndPoints.vehicleInquiry}/${id}`, data);
  return results;
};
