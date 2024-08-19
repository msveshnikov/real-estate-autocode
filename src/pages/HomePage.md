# HomePage Component Documentation

## Overview

The `HomePage` component represents the main landing page of a real estate website. It's located in `src/pages/HomePage.js` and serves as the entry point for users to search for properties and view featured listings.

This component utilizes React hooks, Material-UI components, and lazy loading for optimal performance and user experience.

## Key Features

1. Hero section with a search bar
2. Display of featured properties
3. Lazy loading of property cards
4. Loading skeleton for improved UX during data fetching

## Dependencies

- React (useState, useEffect, lazy, Suspense)
- Material-UI components
- react-router-dom (Link)
- Custom components (SearchBar, PropertyCard)
- propertyService for API calls

## Component Structure

### State

- `featuredProperties`: Array of featured property objects
- `loading`: Boolean to track the loading state of featured properties

### Effects

- `useEffect`: Fetches featured properties on component mount

### Main Render

Returns a structured layout with:
1. Hero section (title, subtitle, search bar)
2. Featured properties section

## Key Functions

### `fetchFeaturedProperties`

An asynchronous function that fetches featured properties from the API.

**Usage:**
```javascript
useEffect(() => {
    fetchFeaturedProperties();
}, []);
```

### `renderPropertyCards`

Renders either loading skeletons or property cards based on the `loading` state.

**Returns:** Grid items with either Skeleton components or PropertyCard components

**Usage:**
```javascript
<Grid container spacing={3}>
    {renderPropertyCards()}
</Grid>
```

## Lazy Loading

The `PropertyCard` component is lazily loaded to improve initial page load time:

```javascript
const PropertyCard = lazy(() => import("../components/PropertyCard"));
```

## Styling

Utilizes Material-UI's `sx` prop for custom styling and `Container` component for responsive layout.

## Usage

This component is typically rendered by the main App component or a router:

```javascript
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      {/* Other routes */}
    </Router>
  );
}
```

## Related Components

- `SearchBar`: Used in the hero section for property search
- `PropertyCard`: Displays individual property information

## API Integration

Utilizes `propertyService` to fetch featured properties:

```javascript
const properties = await propertyService.searchProperties({ featured: true, limit: 6 });
```

## Error Handling

Errors during property fetching are logged to the console:

```javascript
catch (error) {
    console.error("Error fetching featured properties:", error);
}
```

## Future Improvements

1. Implement error state and user-friendly error messages
2. Add pagination or "Load More" functionality for featured properties
3. Implement caching for featured properties to reduce API calls

## Conclusion

The `HomePage` component serves as a crucial entry point for users, offering a search functionality and showcasing featured properties. Its modular design and use of React best practices make it maintainable and extendable for future enhancements.