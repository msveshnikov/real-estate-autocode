import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardMedia
        component="img"
        height="140"
        image={property.image}
        alt={property.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {property.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.address}
        </Typography>
        <Typography variant="h6" color="primary">
          ${property.price.toLocaleString()}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Button variant="contained" onClick={handleCardClick}>
            View Details
          </Button>
          <IconButton
            aria-label="add to favorites"
            onClick={() => onToggleFavorite(property.id)}
          >
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;