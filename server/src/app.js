const express = require('express');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts'); 

const app = express();

// Middleware
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;