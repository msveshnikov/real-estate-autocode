// src/services/propertyService.js

import axios from "axios";

const API_URL = "https://api.example.com/properties"; // Replace with actual API URL

const propertyService = {
    getAllProperties: async () => {
        try {
            const response = await axios.get(API_URL);
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

    searchProperties: async (searchParams) => {
        try {
            const response = await axios.get(API_URL, { params: searchParams });
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

    getFilteredProperties: async (filterOptions) => {
        try {
            const response = await axios.get(`${API_URL}/filter`, { params: filterOptions });
            return response.data;
        } catch (error) {
            console.error("Error fetching filtered properties:", error);
            throw error;
        }
    },
};

export default propertyService;
