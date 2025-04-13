// routes/index.js - Main route handler
const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { 
    page: 'home',
    language: req.query.lang || 'en'
  });
});

// Projects page route
router.get('/projects', (req, res) => {
  res.render('projects', { 
    page: 'projects',
    language: req.query.lang || 'en'
  });
});

// About page route
router.get('/about', (req, res) => {
  res.render('about', { 
    page: 'about',
    language: req.query.lang || 'en'
  });
});

// Contact page route
router.get('/contact', (req, res) => {
  res.render('contact', { 
    page: 'contact',
    language: req.query.lang || 'en'
  });
});

module.exports = router;