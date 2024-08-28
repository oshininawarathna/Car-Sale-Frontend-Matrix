import { BASE_URL } from './Environment';

const baseUrl = BASE_URL.development;

class EndPoints {
  static transaction = `${baseUrl}/transactions`;

  static swapvehicle = `${baseUrl}/swapvehicle`;

  static vehicleInquiry = `${baseUrl}/vehicle_inquiry`;

  static maintenance = `${baseUrl}/maintenances`;

  static lend = `${baseUrl}/lendeds`;

  static testRun = `${baseUrl}/testdrive`;

  static login = `${baseUrl}/login`;

  static vehicle = `${baseUrl}/vehicles`;

  static staff = `${baseUrl}/staff`;

  static customer = `${baseUrl}/customers`;
}

export default EndPoints;
