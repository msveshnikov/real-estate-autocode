// src/services/propertyService.js

const mockProperties = [
    {
        id: 1,
        title: "Modern Apartment",
        description: "A beautiful modern apartment in the city center",
        price: 250000,
        bedrooms: 2,
        bathrooms: 1,
        area: 80,
        address: "123 Main St, Cityville",
        image: "https://example.com/apartment1.jpg",
    },
    {
        id: 2,
        title: "Cozy House",
        description: "A cozy family house with a garden",
        price: 350000,
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        address: "456 Oak Ave, Suburbia",
        image: "https://example.com/house1.jpg",
    },
    // Add more mock properties here
];

const propertyService = {
    getAllProperties: async (page = 1, limit = 20) => {
        const start = (page - 1) * limit;
        const end = start + limit;
        return mockProperties.slice(start, end);
    },

    getPropertyById: async (id) => {
        return mockProperties.find((property) => property.id === parseInt(id));
    },

    searchProperties: async (searchParams, page = 1, limit = 20) => {
        const filteredProperties = mockProperties.filter((property) => {
            return Object.entries(searchParams).every(([key, value]) => {
                if (key === "minPrice") return property.price >= value;
                if (key === "maxPrice") return property.price <= value;
                return property[key].toString().toLowerCase().includes(value.toLowerCase());
            });
        });
        const start = (page - 1) * limit;
        const end = start + limit;
        return filteredProperties.slice(start, end);
    },

    getFavoriteProperties: async (userId) => {
        // In a real app, this would filter based on user's favorites
        return mockProperties.slice(0, 3);
    },

    addFavoriteProperty: async (userId, propertyId) => {
        // In a real app, this would add the property to user's favorites
        return { success: true };
    },

    removeFavoriteProperty: async (userId, propertyId) => {
        // In a real app, this would remove the property from user's favorites
        return { success: true };
    },

    getFilteredProperties: async (filterOptions, page = 1, limit = 20) => {
        const filteredProperties = mockProperties.filter((property) => {
            return Object.entries(filterOptions).every(([key, value]) => {
                if (key === "minPrice") return property.price >= value;
                if (key === "maxPrice") return property.price <= value;
                if (key === "minBedrooms") return property.bedrooms >= value;
                if (key === "minBathrooms") return property.bathrooms >= value;
                if (key === "minArea") return property.area >= value;
                return property[key] === value;
            });
        });
        const start = (page - 1) * limit;
        const end = start + limit;
        return filteredProperties.slice(start, end);
    },

    getSavedSearches: async (userId) => {
        // In a real app, this would return user's saved searches
        return [
            { id: 1, name: "City Center Apartments", criteria: { minBedrooms: 2, maxPrice: 300000 } },
            { id: 2, name: "Suburban Houses", criteria: { minBedrooms: 3, minArea: 100 } },
        ];
    },

    saveSearch: async (userId, searchCriteria) => {
        // In a real app, this would save the search criteria for the user
        return { id: Date.now(), name: "New Search", criteria: searchCriteria };
    },

    deleteSavedSearch: async (userId, searchId) => {
        // In a real app, this would delete the saved search
        return { success: true };
    },

    getPropertyComparison: async (propertyIds) => {
        return propertyIds.map((id) => mockProperties.find((property) => property.id === parseInt(id)));
    },

    calculateMortgage: async (propertyId, downPayment, interestRate, loanTerm) => {
        const property = mockProperties.find((p) => p.id === parseInt(propertyId));
        const loanAmount = property.price - downPayment;
        const monthlyInterest = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        const monthlyPayment =
            (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) /
            (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);
        return {
            monthlyPayment: monthlyPayment.toFixed(2),
            totalPayment: (monthlyPayment * numberOfPayments).toFixed(2),
            totalInterest: (monthlyPayment * numberOfPayments - loanAmount).toFixed(2),
        };
    },
};

export default propertyService;
