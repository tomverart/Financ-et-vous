var express = require('express');
var router = express.Router();

// Template de controlleur get
var getBase = require('../controllers/baseControllers/get.base');

// Controlleurs des notes de frais
var getNoteFraisComptable = require('../controllers/noteFraisControllers/getComptable.notefrais');
var getEmployeeExpenseReports = require('../controllers/noteFraisControllers/getEmployee.expensereports');
var addExpenseReport = require('../controllers/noteFraisControllers/add.expenseReport');
var updateNoteFrais = require('../controllers/noteFraisControllers/update.notefrais');
var getEtatNote = require('../controllers/etatNoteControllers/get.etatNote');
var getRole = require('../controllers/utilisateurControllers/getRole');
var login = require('../controllers/utilisateurControllers/login.js');

// Login
router.post('/utilisateur', login);

router.use((req,res, next) => {
  if(req.session.login){
    next();

    return;
  } else {

    res.sendStatus(401);
  }
})

router.get('/dashboard', (req, res) => {
  /*let theRole = getRole(req.session.login);
  theRole.then(role => {
    if (role === 1) {
      console.log("connected as admin")
    } else if (role === 2) {    //partie comptable
      getNoteFraisComptable(req, res);
    } else if (role === 3) {
      getEmployeeExpenseReports(req, res);
    } else {
      console.log("unknown role : ", getRole(req.session.login))
      res.sendStatus(404);
    }
  })*/
});

router.post('/dashboard', (req, res) => {
  /*let theRole = getRole(req.session.userId);
  theRole.then(role => {
    if (role === 1) {
      console.log("connected as admin")
    } else if (role === 2) {    //partie comptable
      updateNoteFrais(req, res);
    } else if (role === 3) {
      addExpenseReport(req, res);
    } else {
      console.log("unknown role : ", getRole(req.session.userId))
      res.sendStatus(404);
    }
  })*/
});

router.get('/etatNote', getEtatNote);

// Renvoie une erreur 404 en cas de requête avec une route inconnue
router.get('/*', function (req, res) {
  console.log(404);
  res.sendStatus(404);
});

module.exports = router;
