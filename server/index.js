const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const i18n = require('i18n');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const propertiesRouter = require('./routes/properties');
const usersRouter = require('./routes/users');
const appointmentsRouter = require('./routes/appointments');
const searchRouter = require('./routes/search');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors({ origin: process.env.ALLOWED_ORIGINS.split(',') }));
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

i18n.configure({
  locales: ['en', 'es', 'fr'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  objectNotation: true,
});

app.use(i18n.init);

app.use('/api/properties', authMiddleware, propertiesRouter);
app.use('/api/users', usersRouter);
app.use('/api/appointments', authMiddleware, appointmentsRouter);
app.use('/api/search', searchRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;