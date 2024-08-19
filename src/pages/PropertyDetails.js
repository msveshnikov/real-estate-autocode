import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Paper, Button, Chip, Box, CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                // Simulating API call with setTimeout
                setTimeout(() => {
                    const mockProperty = {
                        id,
                        title: "Luxurious Villa",
                        price: 1500000,
                        address: "123 Main St, City, State 12345",
                        description: "A beautiful property with stunning views and modern amenities.",
                        bedrooms: 4,
                        bathrooms: 3,
                        area: 3000,
                        images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
                        features: ["Pool", "Garden", "Garage"],
                    };
                    setProperty(mockProperty);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching property details:", error);
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
        // TODO: Implement logic to save/remove from favorites
    };

    if (loading) {
        return (
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!property) {
        return (
            <Container>
                <Typography variant="h4">Property not found</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <img
                            src={property.images[0]}
                            alt={property.title}
                            style={{ width: "100%", height: "auto", borderRadius: "4px" }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h4" gutterBottom>
                            {property.title}
                        </Typography>
                        <Typography variant="h5" color="primary" gutterBottom>
                            ${property.price.toLocaleString()}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {property.address}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" mb={2}>
                            <Chip icon={<BedIcon />} label={`${property.bedrooms} Beds`} />
                            <Chip icon={<BathtubIcon />} label={`${property.bathrooms} Baths`} />
                            <Chip icon={<SquareFootIcon />} label={`${property.area} sqft`} />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            onClick={handleFavoriteToggle}
                        >
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Description
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {property.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Features
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {property.features.map((feature, index) => (
                                <Chip key={index} label={feature} />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default PropertyDetails;
