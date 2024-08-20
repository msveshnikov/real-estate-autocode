const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Appointment = require('../models/appointment');
const i18n = require('i18n');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id }).populate('propertyId');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: i18n.__('error.serverError') });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const appointment = new Appointment({
    userId: req.user.id,
    propertyId: req.body.propertyId,
    date: req.body.date,
    time: req.body.time,
    notes: req.body.notes,
  });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: i18n.__('error.invalidInput') });
  }
});

router.get('/:id', authenticateToken, getAppointment, (req, res) => {
  res.json(res.appointment);
});

router.patch('/:id', authenticateToken, getAppointment, async (req, res) => {
  if (req.body.date != null) {
    res.appointment.date = req.body.date;
  }
  if (req.body.time != null) {
    res.appointment.time = req.body.time;
  }
  if (req.body.notes != null) {
    res.appointment.notes = req.body.notes;
  }
  try {
    const updatedAppointment = await res.appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: i18n.__('error.invalidInput') });
  }
});

router.delete('/:id', authenticateToken, getAppointment, async (req, res) => {
  try {
    await res.appointment.remove();
    res.json({ message: i18n.__('appointment.deleted') });
  } catch (error) {
    res.status(500).json({ message: i18n.__('error.serverError') });
  }
});

async function getAppointment(req, res, next) {
  let appointment;
  try {
    appointment = await Appointment.findOne({ _id: req.params.id, userId: req.user.id }).populate('propertyId');
    if (appointment == null) {
      return res.status(404).json({ message: i18n.__('appointment.notFound') });
    }
  } catch (error) {
    return res.status(500).json({ message: i18n.__('error.serverError') });
  }

  res.appointment = appointment;
  next();
}

module.exports = router;