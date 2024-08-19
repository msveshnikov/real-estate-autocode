import React, { useState } from "react";
import { Box, Typography, Slider, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";

const FilterOptions = ({ onFilterChange }) => {
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [propertyType, setPropertyType] = useState({
        house: false,
        apartment: false,
        condo: false,
        townhouse: false,
    });

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleBedroomsChange = (event) => {
        setBedrooms(event.target.value);
    };

    const handleBathroomsChange = (event) => {
        setBathrooms(event.target.value);
    };

    const handlePropertyTypeChange = (event) => {
        setPropertyType({
            ...propertyType,
            [event.target.name]: event.target.checked,
        });
    };

    const handleApplyFilters = () => {
        onFilterChange({
            priceRange,
            bedrooms,
            bathrooms,
            propertyType,
        });
    };

    return (
        <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
                Filter Options
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000000}
                    step={10000}
                />
                <Typography>
                    ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </Typography>
            </Box>
            <TextField
                label="Bedrooms"
                type="number"
                value={bedrooms}
                onChange={handleBedroomsChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Bathrooms"
                type="number"
                value={bathrooms}
                onChange={handleBathroomsChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Typography gutterBottom>Property Type</Typography>
            <FormControlLabel
                control={<Checkbox checked={propertyType.house} onChange={handlePropertyTypeChange} name="house" />}
                label="House"
            />
            <FormControlLabel
                control={
                    <Checkbox checked={propertyType.apartment} onChange={handlePropertyTypeChange} name="apartment" />
                }
                label="Apartment"
            />
            <FormControlLabel
                control={<Checkbox checked={propertyType.condo} onChange={handlePropertyTypeChange} name="condo" />}
                label="Condo"
            />
            <FormControlLabel
                control={
                    <Checkbox checked={propertyType.townhouse} onChange={handlePropertyTypeChange} name="townhouse" />
                }
                label="Townhouse"
            />
            <Button variant="contained" color="primary" onClick={handleApplyFilters} fullWidth sx={{ mt: 2 }}>
                Apply Filters
            </Button>
        </Box>
    );
};

export default FilterOptions;
