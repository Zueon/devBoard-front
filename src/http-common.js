import axios from "axios";
import { API_BASE_URL } from "./AppConfig";

const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

export default axios.create({
  baseURL: `${API_BASE_URL}/`,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
