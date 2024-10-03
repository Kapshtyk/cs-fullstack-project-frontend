import axios from "axios";

import { API_PREFIX, API_URL } from "@/shared/config";

export const apiClient = axios.create({
  baseURL: API_URL + API_PREFIX,

  headers: {
    "Content-Type": "application/json",
  },
});
