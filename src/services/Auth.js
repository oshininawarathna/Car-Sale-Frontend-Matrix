import axios from 'axios';
import EndPoints from './Endpoints';

export const handleLogin = async (data) => {
  const results = await axios.post(EndPoints.login, data);
  return results;
};
