// Cliente de axios para el frontend
import axios from "axios";

// Configuramos el cliente de axios
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  headers: { "Content-Type": "application/json" },
});
