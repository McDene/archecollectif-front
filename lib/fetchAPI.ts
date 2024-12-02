import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";

export const fetchAPI = async (endpoint: string) => {
  console.log(`Fetching API: ${API_URL}${endpoint}`);
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate", // Désactive la mise en cache
        Pragma: "no-cache", // Compatibilité avec HTTP/1.0
        Expires: "0", // Expiration immédiate
      },
      params: {
        timestamp: Date.now(), // Ajout d'un paramètre pour éviter le cache
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel API :", error);
    return null;
  }
};
