import axios from 'axios';

const API_URL = 'https://a428bc4e1988.ngrok-free.app'; 

export const testBackendConnection = async () => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Backend connect nahi ho paya:", error);
    return null;
  }
};