import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer  ${process.env.API_KEY}`,
  },
});
