const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Property = require('../models/Property');
const { body, validationResult } = require('express-validator');
const i18n = require('i18n');

// GET all properties
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
    };

    const properties = await Property.paginate({}, options);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: i18n.__('server_error') });
  }
});

// GET a specific property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: i18n.__('property_not_found') });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: i18n.__('server_error') });
  }
});

// POST a new property
router.post(
  '/',
  auth,
  [
    body('title').notEmpty().trim().escape(),
    body('description').notEmpty().trim().escape(),
    body('price').isNumeric(),
    body('location').notEmpty().trim().escape(),
    body('bedrooms').isInt({ min: 0 }),
    body('bathrooms').isInt({ min: 0 }),
    body('area').isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newProperty = new Property({
        ...req.body,
        owner: req.user.id,
      });
      const savedProperty = await newProperty.save();
      res.status(201).json(savedProperty);
    } catch (error) {
      res.status(500).json({ message: i18n.__('server_error') });
    }
  }
);

// PUT update a property
router.put(
  '/:id',
  auth,
  [
    body('title').optional().trim().escape(),
    body('description').optional().trim().escape(),
    body('price').optional().isNumeric(),
    body('location').optional().trim().escape(),
    body('bedrooms').optional().isInt({ min: 0 }),
    body('bathrooms').optional().isInt({ min: 0 }),
    body('area').optional().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: i18n.__('property_not_found') });
      }

      if (property.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: i18n.__('not_authorized') });
      }

      const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.json(updatedProperty);
    } catch (error) {
      res.status(500).json({ message: i18n.__('server_error') });
    }
  }
);

// DELETE a property
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: i18n.__('property_not_found') });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: i18n.__('not_authorized') });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: i18n.__('property_deleted') });
  } catch (error) {
    res.status(500).json({ message: i18n.__('server_error') });
  }
});

module.exports = router;