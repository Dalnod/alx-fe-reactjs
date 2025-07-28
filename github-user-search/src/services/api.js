// src/services/api.js
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

export async function fetchGitHubUser(username) {
  const response = await fetch(`${API_URL}/users/${username}`);
  return response.json();
}