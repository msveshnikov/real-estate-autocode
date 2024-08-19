// src/services/propertyService.js

import axios from "axios";

const API_URL = "https://api.example.com/properties";

const propertyService = {
    getAllProperties: async (page = 1, limit = 20) => {
        try {
            const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching properties:", error);
            throw error;
        }
    },

    getPropertyById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching property with id ${id}:`, error);
            throw error;
        }
    },

    searchProperties: async (searchParams, page = 1, limit = 20) => {
        try {
            const response = await axios.get(`${API_URL}/search`, {
                params: { ...searchParams, page, limit },
            });
            return response.data;
        } catch (error) {
            console.error("Error searching properties:", error);
            throw error;
        }
    },

    getFavoriteProperties: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/favorites/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching favorite properties for user ${userId}:`, error);
            throw error;
        }
    },

    addFavoriteProperty: async (userId, propertyId) => {
        try {
            const response = await axios.post(`${API_URL}/favorites/${userId}`, { propertyId });
            return response.data;
        } catch (error) {
            console.error(`Error adding property ${propertyId} to favorites for user ${userId}:`, error);
            throw error;
        }
    },

    removeFavoriteProperty: async (userId, propertyId) => {
        try {
            const response = await axios.delete(`${API_URL}/favorites/${userId}/${propertyId}`);
            return response.data;
        } catch (error) {
            console.error(`Error removing property ${propertyId} from favorites for user ${userId}:`, error);
            throw error;
        }
    },

    getFilteredProperties: async (filterOptions, page = 1, limit = 20) => {
        try {
            const response = await axios.get(`${API_URL}/filter`, {
                params: { ...filterOptions, page, limit },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching filtered properties:", error);
            throw error;
        }
    },

    getSavedSearches: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/saved-searches/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching saved searches for user ${userId}:`, error);
            throw error;
        }
    },

    saveSearch: async (userId, searchCriteria) => {
        try {
            const response = await axios.post(`${API_URL}/saved-searches/${userId}`, searchCriteria);
            return response.data;
        } catch (error) {
            console.error(`Error saving search for user ${userId}:`, error);
            throw error;
        }
    },

    deleteSavedSearch: async (userId, searchId) => {
        try {
            const response = await axios.delete(`${API_URL}/saved-searches/${userId}/${searchId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting saved search ${searchId} for user ${userId}:`, error);
            throw error;
        }
    },

    getPropertyComparison: async (propertyIds) => {
        try {
            const response = await axios.get(`${API_URL}/compare`, {
                params: { ids: propertyIds.join(",") },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching property comparison:", error);
            throw error;
        }
    },

    calculateMortgage: async (propertyId, downPayment, interestRate, loanTerm) => {
        try {
            const response = await axios.post(`${API_URL}/${propertyId}/mortgage-calculator`, {
                downPayment,
                interestRate,
                loanTerm,
            });
            return response.data;
        } catch (error) {
            console.error(`Error calculating mortgage for property ${propertyId}:`, error);
            throw error;
        }
    },
};

export default propertyService;
