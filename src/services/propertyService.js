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
        image: "https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJlYWxlc3RhdGV8ZW58MHx8MHx8fDA%3D",
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
        image: "https://images.unsplash.com/photo-1601760562234-9814eea6663a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlYWxlc3RhdGV8ZW58MHx8MHx8fDA%3D",
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
        return mockProperties.slice(0, 3);
    },

    addFavoriteProperty: async (userId, propertyId) => {
        return { success: true };
    },

    removeFavoriteProperty: async (userId, propertyId) => {
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
        return [
            { id: 1, name: "City Center Apartments", criteria: { minBedrooms: 2, maxPrice: 300000 } },
            { id: 2, name: "Suburban Houses", criteria: { minBedrooms: 3, minArea: 100 } },
        ];
    },

    saveSearch: async (userId, searchCriteria) => {
        return { id: Date.now(), name: "New Search", criteria: searchCriteria };
    },

    deleteSavedSearch: async (userId, searchId) => {
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
