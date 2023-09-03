const END_POINT =
  "https://6145-2402-d000-8100-9a5f-9412-b815-5a2a-3a69.ngrok-free.app"; // Replace with your server's URL
import axios from "axios";

export const API_KEY = "AIzaSyCmbM6cGKVeJ6wA8IoddQDgz2u1ZB9rOKE";

const api = axios.create({
  baseURL: END_POINT, // Replace with your server's URL
  timeout: 10000, // Adjust the timeout as needed
});

export default api;
