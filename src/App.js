import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

const HomePage = lazy(() => import("./pages/HomePage.js"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails.js"));
const SearchResults = lazy(() => import("./pages/SearchResults.js"));
const Favorites = lazy(() => import("./pages/Favorites.js"));
const Login = lazy(() => import("./pages/Login.js"));
const Register = lazy(() => import("./pages/Register.js"));

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode) {
            setDarkMode(JSON.parse(savedMode));
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#2196f3",
            },
            mode: darkMode ? "dark" : "light",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Suspense
                    fallback={
                        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                            <CircularProgress />
                        </Box>
                    }
                >
                    <Routes>
                        <Route path="/" element={<HomePage toggleDarkMode={toggleDarkMode} />} />
                        <Route path="/property/:id" element={<PropertyDetails />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
};

export default App;
