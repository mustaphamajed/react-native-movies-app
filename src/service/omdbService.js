import axios from 'axios';

const API_KEY = 'b0255261'; 
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: searchTerm,
        apikey: API_KEY,
        page,
      },
    });
    return response.data;
  } catch (error) {
return error
  }
};