import axios from "axios";

const apiClient = axios.create();

export const client = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  apiClient.defaults.baseURL = baseUrl;

  return apiClient;
};
