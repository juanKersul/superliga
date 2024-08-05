import axios from "axios";
import { buildQueryString, QueryParams } from "../utils/buildQueryString";

const BASE_URL = "http://localhost:8000/Persons";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const getPersons = async (params: QueryParams) => {
  try {
    const queryString = buildQueryString(params);
    const response = await apiClient.get(queryString);
    return response.data;
  } catch (error) {
    console.error("Error fetching persons:", error);
    throw error;
  }
};
