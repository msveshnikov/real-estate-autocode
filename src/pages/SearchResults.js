import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, TextField, Button, Pagination } from "@mui/material";
import PropertyCard from "../components/PropertyCard";
import FilterOptions from "../components/FilterOptions";
import propertyService from "../services/propertyService";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [, setFilters] = useState({});
    const location = useLocation();
    const propertiesPerPage = 12;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const initialSearchTerm = searchParams.get("q") || "";
        setSearchTerm(initialSearchTerm);
        fetchProperties(initialSearchTerm);
    }, [location.search]);

    const fetchProperties = async (search) => {
        const fetchedProperties = await propertyService.searchProperties(search);
        setProperties(fetchedProperties);
        setFilteredProperties(fetchedProperties);
        setTotalPages(Math.ceil(fetchedProperties.length / propertiesPerPage));
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetchProperties(searchTerm);
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
                <form onSubmit={handleSearch}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </form>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <FilterOptions onFilterChange={handleFilterChange} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Grid container spacing={3}>
                        {paginatedProperties.map((property) => (
                            <Grid item xs={12} sm={6} md={4} key={property.id}>
                                <PropertyCard property={property} />
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={4} display="flex" justifyContent="center">
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SearchResults;
