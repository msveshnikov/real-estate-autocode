import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Typography, Grid, Button, Pagination, useTheme, useMediaQuery } from "@mui/material";
import PropertyCard from "../components/PropertyCard";
import FilterOptions from "../components/FilterOptions";
import SearchBar from "../components/SearchBar";
import propertyService from "../services/propertyService";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const propertiesPerPage = 12;

    const fetchProperties = useCallback(async (search) => {
        setLoading(true);
        try {
            const fetchedProperties = await propertyService.searchProperties(search);
            setProperties(fetchedProperties);
            setFilteredProperties(fetchedProperties);
            setTotalPages(Math.ceil(fetchedProperties.length / propertiesPerPage));
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const initialSearchTerm = searchParams.get("q") || "";
        setSearchTerm(initialSearchTerm);
        fetchProperties(initialSearchTerm);
    }, [location.search, fetchProperties]);

    const handleSearch = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
        navigate(`/search?q=${encodeURIComponent(newSearchTerm)}`);
        fetchProperties(newSearchTerm);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        const filtered = properties.filter((property) => {
            return Object.entries(newFilters).every(([key, value]) => {
                if (!value) return true;
                return property[key] === value;
            });
        });
        setFilteredProperties(filtered);
        setTotalPages(Math.ceil(filtered.length / propertiesPerPage));
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const paginatedProperties = filteredProperties.slice(
        (currentPage - 1) * propertiesPerPage,
        currentPage * propertiesPerPage
    );

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Search Results
                </Typography>
                <SearchBar initialValue={searchTerm} onSearch={handleSearch} />
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <FilterOptions onFilterChange={handleFilterChange} />
                </Grid>
                <Grid item xs={12} md={9}>
                    {loading ? (
                        <Typography>Loading properties...</Typography>
                    ) : (
                        <>
                            <Grid container spacing={3}>
                                {paginatedProperties.map((property) => (
                                    <Grid item xs={12} sm={6} md={4} key={property.id}>
                                        <PropertyCard property={property} />
                                    </Grid>
                                ))}
                            </Grid>
                            {filteredProperties.length === 0 && (
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    No properties found matching your criteria.
                                </Typography>
                            )}
                            <Box mt={4} display="flex" justifyContent="center">
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size={isMobile ? "small" : "medium"}
                                />
                            </Box>
                        </>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default SearchResults;
