// app.js - Main server file
const express = require('express');
const path = require('path');
const app = express();

// Usar el puerto proporcionado por Vercel o el puerto local 3000 si no está definido
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Handle 404 errors
app.use((req, res) => {
  const language = req.query.lang || 'en';
  res.status(404).render('404', { 
    page: 'error',
    language
  });
});

// Start the server (escucha el puerto proporcionado por Vercel o 3000)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
