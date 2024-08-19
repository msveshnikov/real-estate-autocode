import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch("/api/favorites");
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (propertyId) => {
        try {
            await fetch(`/api/favorites/${propertyId}`, { method: "DELETE" });
            setFavorites(favorites.filter((property) => property.id !== propertyId));
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Favorite Properties
            </Typography>
            {favorites.length === 0 ? (
                <Typography variant="body1">You haven't saved any properties yet.</Typography>
            ) : (
                <Grid container spacing={4}>
                    {favorites.map((property) => (
                        <Grid item key={property.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia component="img" height="200" image={property.image} alt={property.title} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {property.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {property.description}
                                    </Typography>
                                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                                        ${property.price.toLocaleString()}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" component={Link} to={`/property/${property.id}`}>
                                        View Details
                                    </Button>
                                    <IconButton
                                        aria-label="remove from favorites"
                                        onClick={() => handleRemoveFavorite(property.id)}
                                        sx={{ marginLeft: "auto", color: theme.palette.error.main }}
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Favorites;
