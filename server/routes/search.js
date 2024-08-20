const express = require('express');
const router = express.Router();
const Property = require('../models/property');
const { authenticate } = require('../middleware/auth');
const i18n = require('i18n');

router.get('/', authenticate, async (req, res) => {
  try {
    const { query, type, minPrice, maxPrice, bedrooms, bathrooms, location } = req.query;
    const filter = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    if (type) filter.type = type;
    if (minPrice) filter.price = { $gte: parseInt(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseInt(maxPrice) };
    if (bedrooms) filter.bedrooms = parseInt(bedrooms);
    if (bathrooms) filter.bathrooms = parseInt(bathrooms);
    if (location) filter.location = { $regex: location, $options: 'i' };

    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.json(properties.map(property => ({
      ...property.toObject(),
      description: i18n.__(property.description, { locale: req.user.language })
    })));
  } catch (error) {
    res.status(500).json({ message: i18n.__('Error searching properties'), error: error.message });
  }
});

router.get('/advanced', authenticate, async (req, res) => {
  try {
    const { amenities, sortBy, order, page = 1, limit = 10 } = req.query;
    const filter = { ...req.query };

    delete filter.amenities;
    delete filter.sortBy;
    delete filter.order;
    delete filter.page;
    delete filter.limit;

    if (amenities) {
      filter.amenities = { $all: amenities.split(',') };
    }

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    }

    const properties = await Property.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Property.countDocuments(filter);

    res.json({
      properties: properties.map(property => ({
        ...property.toObject(),
        description: i18n.__(property.description, { locale: req.user.language })
      })),
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: i18n.__('Error performing advanced search'), error: error.message });
  }
});

router.get('/nearby', authenticate, async (req, res) => {
  try {
    const { latitude, longitude, radius = 10, unit = 'km' } = req.query;
    const maxDistance = unit === 'mi' ? radius * 1609.34 : radius * 1000;

    const properties = await Property.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: maxDistance
        }
      }
    }).limit(20);

    res.json(properties.map(property => ({
      ...property.toObject(),
      description: i18n.__(property.description, { locale: req.user.language })
    })));
  } catch (error) {
    res.status(500).json({ message: i18n.__('Error searching nearby properties'), error: error.message });
  }
});

module.exports = router;