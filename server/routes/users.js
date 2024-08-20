const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const i18n = require('i18n');
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many registration attempts, please try again later' },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, please try again later' },
});

router.post(
  '/register',
  registerLimiter,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('language', 'Language is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, language } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: i18n.__({ phrase: 'User already exists', locale: language }) });
      }
      user = new User({ name, email, password, language });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(i18n.__('Server Error'));
    }
  }
);

router.post(
  '/login',
  loginLimiter,
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    check('language', 'Language is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, language } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: i18n.__({ phrase: 'Invalid credentials', locale: language }) });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: i18n.__({ phrase: 'Invalid credentials', locale: language }) });
      }
      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(i18n.__('Server Error'));
    }
  }
);

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(i18n.__('Server Error'));
  }
});

router.put(
  '/update',
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('language', 'Language is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, language } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { name, email, language } },
        { new: true }
      ).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(i18n.__('Server Error'));
    }
  }
);

router.delete('/delete', auth, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.user.id);
    res.json({ msg: i18n.__('User deleted') });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(i18n.__('Server Error'));
  }
});

router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: i18n.__('Current password is incorrect') });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ msg: i18n.__('Password updated successfully') });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(i18n.__('Server Error'));
  }
});

module.exports = router;