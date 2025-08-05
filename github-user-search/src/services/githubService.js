export const fetchUserData = async (searchTerm) => {
    const response = await axios.get(`${BASE_URL}/search/users`, {
        params: { q: searchTerm }
    });
    return response.data;
};

import axios from 'axios';

const BASE_URL = "https://api.github.com/search/users?q";

// Accepts an object with username, location, and minRepos, and builds the query string
export const searchUsers = async ({ username = '', location = '', minRepos = '' }) => {
    let query = username;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>${minRepos}`;
    const response = await axios.get(`${BASE_URL}/search/users`, {
        params: { q: query }
    });
    return response.data;
};

export const getUserDetails = async (username) => {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
};
