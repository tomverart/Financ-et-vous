var express = require('express');
var router = express.Router();

// Template de controlleur get
var getBase = require('../controllers/baseControllers/get.base');

// Template de base pour routing
router.get('/base', getBase);

// app.post('/', (req, res) => {
// });

// app.put('/', (req, res) => {
// });

// app.delete('/', (req, res) => {
// });

// Renvoie une erreur 404 en cas de requête avec une route inconnue
router.get('/*', function (req, res) {
  console.log(404);
  res.sendStatus(404);
});

module.exports = router;
