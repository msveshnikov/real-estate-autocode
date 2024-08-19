# Property Service Documentation

## Overview

The `propertyService.js` file is a crucial part of the real estate application, located in the `src/services` directory. It provides a mock implementation of various property-related operations, simulating interactions with a backend service. This service handles operations such as retrieving property listings, searching properties, managing favorite properties, and performing property-related calculations.

## Functions

### getAllProperties

Retrieves a paginated list of all properties.

**Parameters:**
- `page` (optional): The page number (default: 1)
- `limit` (optional): The number of items per page (default: 20)

**Returns:** A Promise that resolves to an array of property objects.

**Usage:**
```javascript
const properties = await propertyService.getAllProperties(1, 10);
```

### getPropertyById

Retrieves a specific property by its ID.

**Parameters:**
- `id`: The ID of the property to retrieve

**Returns:** A Promise that resolves to a property object or undefined if not found.

**Usage:**
```javascript
const property = await propertyService.getPropertyById(1);
```

### searchProperties

Searches properties based on given criteria.

**Parameters:**
- `searchParams`: An object containing search criteria
- `page` (optional): The page number (default: 1)
- `limit` (optional): The number of items per page (default: 20)

**Returns:** A Promise that resolves to an array of matching property objects.

**Usage:**
```javascript
const results = await propertyService.searchProperties({ minPrice: 200000, maxPrice: 300000 }, 1, 20);
```

### getFavoriteProperties

Retrieves favorite properties for a user (mock implementation).

**Parameters:**
- `userId`: The ID of the user

**Returns:** A Promise that resolves to an array of favorite property objects.

**Usage:**
```javascript
const favorites = await propertyService.getFavoriteProperties('user123');
```

### addFavoriteProperty

Adds a property to a user's favorites (mock implementation).

**Parameters:**
- `userId`: The ID of the user
- `propertyId`: The ID of the property to add to favorites

**Returns:** A Promise that resolves to an object indicating success.

**Usage:**
```javascript
const result = await propertyService.addFavoriteProperty('user123', 1);
```

### removeFavoriteProperty

Removes a property from a user's favorites (mock implementation).

**Parameters:**
- `userId`: The ID of the user
- `propertyId`: The ID of the property to remove from favorites

**Returns:** A Promise that resolves to an object indicating success.

**Usage:**
```javascript
const result = await propertyService.removeFavoriteProperty('user123', 1);
```

### getFilteredProperties

Retrieves properties based on filter criteria.

**Parameters:**
- `filterOptions`: An object containing filter criteria
- `page` (optional): The page number (default: 1)
- `limit` (optional): The number of items per page (default: 20)

**Returns:** A Promise that resolves to an array of matching property objects.

**Usage:**
```javascript
const filtered = await propertyService.getFilteredProperties({ minBedrooms: 2, maxPrice: 300000 }, 1, 20);
```

### getSavedSearches

Retrieves saved searches for a user (mock implementation).

**Parameters:**
- `userId`: The ID of the user

**Returns:** A Promise that resolves to an array of saved search objects.

**Usage:**
```javascript
const savedSearches = await propertyService.getSavedSearches('user123');
```

### saveSearch

Saves a search criteria for a user (mock implementation).

**Parameters:**
- `userId`: The ID of the user
- `searchCriteria`: An object containing the search criteria to save

**Returns:** A Promise that resolves to the saved search object.

**Usage:**
```javascript
const savedSearch = await propertyService.saveSearch('user123', { minBedrooms: 2, maxPrice: 300000 });
```

### deleteSavedSearch

Deletes a saved search for a user (mock implementation).

**Parameters:**
- `userId`: The ID of the user
- `searchId`: The ID of the saved search to delete

**Returns:** A Promise that resolves to an object indicating success.

**Usage:**
```javascript
const result = await propertyService.deleteSavedSearch('user123', 1);
```

### getPropertyComparison

Retrieves multiple properties for comparison.

**Parameters:**
- `propertyIds`: An array of property IDs to compare

**Returns:** A Promise that resolves to an array of property objects.

**Usage:**
```javascript
const comparisonProperties = await propertyService.getPropertyComparison([1, 2, 3]);
```

### calculateMortgage

Calculates mortgage details for a property.

**Parameters:**
- `propertyId`: The ID of the property
- `downPayment`: The down payment amount
- `interestRate`: The annual interest rate (as a percentage)
- `loanTerm`: The loan term in years

**Returns:** A Promise that resolves to an object containing mortgage calculation results.

**Usage:**
```javascript
const mortgageDetails = await propertyService.calculateMortgage(1, 50000, 3.5, 30);
```

## Integration with Project Structure

This service is designed to be used by various components and pages within the application, such as:

- `src/pages/HomePage.js`: For displaying featured properties
- `src/pages/SearchResults.js`: For showing search and filtered results
- `src/pages/PropertyDetails.js`: For retrieving individual property details
- `src/pages/Favorites.js`: For managing user's favorite properties
- `src/components/SearchBar.js`: For initiating property searches
- `src/components/FilterOptions.js`: For applying advanced filters to property listings

The mock data and implementations in this service allow for development and testing of the front-end components without needing a live backend service. In a production environment, these methods would be replaced with actual API calls to a backend server.