import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import propertyService from "../services/propertyService";

const HomePage = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);

    useEffect(() => {
        const fetchFeaturedProperties = async () => {
            const properties = await propertyService.searchProperties({ featured: true, limit: 6 });
            setFeaturedProperties(properties);
        };
        fetchFeaturedProperties();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ backgroundColor: "primary.main", color: "white", py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h2" component="h1" gutterBottom>
                        Find Your Dream Home
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Discover the perfect property with our extensive listings
                    </Typography>
                    <SearchBar />
                </Container>
            </Box>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Featured Properties
                </Typography>
                <Grid container spacing={3}>
                    {featuredProperties.map((property) => (
                        <Grid item xs={12} sm={6} md={4} key={property.id}>
                            <PropertyCard property={property} />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Button component={Link} to="/search" variant="contained" color="primary" size="large">
                        View All Properties
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default HomePage;
