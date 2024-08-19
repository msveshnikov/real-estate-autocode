import React, { useState, useEffect, lazy, Suspense } from "react";
import { Box, Typography, Container, Grid, Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import propertyService from "../services/propertyService";

const PropertyCard = lazy(() => import("../components/PropertyCard"));

const HomePage = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProperties = async () => {
            try {
                const properties = await propertyService.searchProperties({ featured: true, limit: 6 });
                setFeaturedProperties(properties);
            } catch (error) {
                console.error("Error fetching featured properties:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProperties();
    }, []);

    const renderPropertyCards = () => {
        if (loading) {
            return Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                </Grid>
            ));
        }

        return featuredProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={200} />}>
                    <PropertyCard property={property} />
                </Suspense>
            </Grid>
        ));
    };

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
                    {renderPropertyCards()}
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
