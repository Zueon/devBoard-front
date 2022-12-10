import axios from "axios";
import { API_BASE_URL } from "./AppConfig";

export default axios.create({
  baseURL: `${API_BASE_URL}/filectrl`,
  headers: {
    "Content-type": "application/json",
  },
});
