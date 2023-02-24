import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer  ${import.meta.env.VITE_API_KEY}`,
  },
});

console.log(import.meta.env.VITE_API_KEY);
