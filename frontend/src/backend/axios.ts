import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const getErrorMessage = (error: any) => {
  if (error.isAxiosError) {
    return error.response?.data.message;
  }
  return error.message;
};
