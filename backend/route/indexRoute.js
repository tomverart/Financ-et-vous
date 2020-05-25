var express = require('express');
var router = express.Router();
// const multer = require('multer');
// const upload = multer({ dest: './ressources/tempImageFrais' });

// Template de controlleur get
var getBase = require('../controllers/baseControllers/get.base');

// Controlleurs des notes de frais
var getNoteFraisComptable = require('../controllers/noteFraisControllers/getComptable.notefrais');
var getEmployeeExpenseReports = require('../controllers/noteFraisControllers/getEmployee.expensereports');
var addExpenseReport = require('../controllers/noteFraisControllers/add.expenseReport');
var deleteExpenseReport = require('../controllers/noteFraisControllers/delete.expenseReport');
var updateNoteFrais = require('../controllers/noteFraisControllers/update.notefrais');
var getEtatNote = require('../controllers/etatNoteControllers/get.etatNote');
var getUserByLogin = require('../controllers/utilisateurControllers/getUserByLogin');
var login = require('../controllers/utilisateurControllers/login.js');
var getExpenseReport = require('../controllers/noteFraisControllers/getExpenseReport');

// Login
router.post('/utilisateur', login);

router.use((req, res, next) => {
  if (req.session.login) {
    next();

    return;
  } else {
    console.log(req.session.login);
    res.sendStatus(401);
  }
});

router.get('/dashboard', (req, res) => {
  let theUser = getUserByLogin(req.session.login);
  theUser.then(user => {
    if (user.idrole === 1) {
      console.log("connected as admin");
    } else if (user.idrole === 2) {    //partie comptable
      getNoteFraisComptable(req, res);
    } else if (user.idrole === 3) {   //employee
      if (req.query.action) {
        switch (req.query.action) {
          case "view":
            if (req.query.id) {
              getExpenseReport(req, res);
            }
            break;
          case "delete":
            if (req.query.id) {
              deleteExpenseReport(req, res);
            }
            break;
          default:
            break;
        }
      } else {
        getEmployeeExpenseReports(req, res);
      }
    } else {
      console.log("unknown role : ");
      res.sendStatus(404);
    }
  })
});

router.post('/dashboard', (req, res) => {
  let theUser = getUserByLogin(req.session.login);
  theUser.then(user => {
    if (user.idrole === 1) {
      console.log("admin post request")
    } else if (user.idrole === 2) {    //partie comptable
      console.log("accountant post request")
    } else if (user.idrole === 3) {
      addExpenseReport(req, res);
    } else {
      console.log("unknown role post request")
      res.sendStatus(404);
    }
  })
});

router.get('/etatNote', getEtatNote);

// Renvoie une erreur 404 en cas de requête avec une route inconnue
router.get('/*', function (req, res) {
  console.log(404);
  res.sendStatus(404);
});

module.exports = router;
