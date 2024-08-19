# App.js Documentation

## Overview

`App.js` is the main component of the React application. It sets up the routing, theme management, and lazy loading of components. This file is crucial for the overall structure and functionality of the application.

## Dependencies

- React
- React Router
- Material-UI
- Custom page components (lazy loaded)

## Main Component: App

The `App` component is a functional component that serves as the root of the application.

### State

- `darkMode`: Boolean state to toggle between light and dark themes.

### Effects

- `useEffect`: Runs on component mount to retrieve the saved dark mode preference from local storage.

### Functions

#### toggleDarkMode

Toggles the dark mode state and saves the preference to local storage.

**Parameters:** None
**Returns:** None

### Theme Configuration

Creates a Material-UI theme based on the current `darkMode` state.

### Routing

Sets up the application routes using React Router.

## Lazy Loaded Components

The following components are lazy loaded to improve initial load time:

- HomePage
- PropertyDetails
- SearchResults
- Favorites
- Login
- Register

## Route Structure

- `/`: Home page
- `/property/:id`: Property details page
- `/search`: Search results page
- `/favorites`: Favorites page
- `/login`: Login page
- `/register`: Registration page

## Usage

```jsx
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

## Project Context

`App.js` is the entry point for the React application's component structure. It integrates with other parts of the project as follows:

- Utilizes components from the `pages` directory for different routes
- Sets up the theme which will be used by Material-UI components throughout the application
- Implements lazy loading to optimize performance
- Manages the dark mode preference, which affects the entire application's appearance

## Key Features

1. **Theme Management**: Implements a dark mode toggle with local storage persistence.
2. **Lazy Loading**: Utilizes React's lazy and Suspense for code splitting and improved performance.
3. **Responsive Layout**: Uses Material-UI's Box and CircularProgress for a centered loading indicator.
4. **Routing**: Implements client-side routing with React Router.

## Notes

- The dark mode toggle function (`toggleDarkMode`) is passed to the HomePage component, suggesting that the toggle control is located on the home page.
- The application uses a mix of Material-UI components (like ThemeProvider and CssBaseline) for consistent styling and theming.
- Error boundaries should be considered for handling potential errors during lazy loading.

This documentation provides an overview of the `App.js` file and its role in the project structure. For more detailed information about individual pages or components, refer to their respective documentation.