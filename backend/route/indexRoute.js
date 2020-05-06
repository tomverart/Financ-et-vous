var express = require('express');
var router = express.Router();

// Template de controlleur get
var getBase = require('../controllers/baseControllers/get.base');

// Controlleurs des notes de frais
var getNoteFraisComptable = require('../controllers/noteFraisControllers/getComptable.notefrais');
var updateNoteFrais = require('../controllers/noteFraisControllers/update.notefrais');

// Template de base pour routing
router.get('/base', getBase);

// router.post('/', (req, res) => {
// });

router.get('/employee_dashboard', getNoteFraisComptable);
router.post('/new_report', (req, res)=> {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  res.json({st:"cooo"})
})
//router.post('/dashboard/employee', updateNoteFrais);
// router.delete('/', (req, res) => {
// });

// Renvoie une erreur 404 en cas de requête avec une route inconnue
router.get('/*', function (req, res) {
  console.log(404);
  res.sendStatus(404);
});

module.exports = router;
