var express = require('express');
var router = express.Router();
const multer = require('multer');
// Répertoire des images temporaires
const upload = multer({ dest: './ressources/tempImagesFrais' });


// Controlleurs utilisateur
var getUserByLogin = require('../controllers/utilisateurControllers/getUserByLogin');
var login = require('../controllers/utilisateurControllers/login.js');

// Controlleurs des notes de frais
var getNoteFraisComptable = require('../controllers/noteFraisControllers/getComptable.notefrais');
var getEmployeeExpenseReports = require('../controllers/noteFraisControllers/getEmployee.expensereports');
var addExpenseReport = require('../controllers/noteFraisControllers/add.expenseReport');
var deleteExpenseReport = require('../controllers/noteFraisControllers/delete.expenseReport');
var updateNoteFrais = require('../controllers/noteFraisControllers/update.notefrais');
var getEtatNote = require('../controllers/etatNoteControllers/get.etatNote');
var getExpenseReport = require('../controllers/noteFraisControllers/getExpenseReport');

// Controlleurs des frais
var createFrais = require('../controllers/fraisControllers/create.frais');
var getImage = require('../controllers/fraisControllers/getImage.frais');

// Controlleurs de gestion d'images
router.post('/uploadImage', upload.single('file'), createFrais);
router.get('/downloadImage', getImage);

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

router.get('/dashboard?:id', (req, res) => {
  let theUser = getUserByLogin(req.session.login);
  theUser.then(user => {
    if (user.idrole === 1) {
      console.log("connected as admin");
    } else if (user.idrole === 2) {    //partie comptable
      getNoteFraisComptable(req, res);
    } else if (user.idrole === 3) {   //employee
      if (req.query.id) {
        getExpenseReport(req, res);
      } else {
        getEmployeeExpenseReports(req, res);
      }
    } else {
      console.log("unknown role : ");
      res.sendStatus(404);
    }
  })
});

router.post('/dashboard/:action', (req, res) => {
  let theUser = getUserByLogin(req.session.login);
  theUser.then(user => {
    if (user.idrole === 1) {
      console.log("admin post request")
    } else if (user.idrole === 2) {    //partie comptable
      console.log("accountant post request")
      switch (req.params.action) {
        case "add":
          addExpenseReport(req, res);
          break;
        case "update":
          if (req.body.idnotefrais) {
            updateNoteFrais(req, res);
          }
          break;
          default:
            break;
        }
    } else if (user.idrole === 3) {
      if (req.params.action) {
        switch (req.params.action) {
          case "add":
            addExpenseReport(req, res);
            break;
          case "update":
            if (req.body.idnotefrais) {
              updateNoteFrais(req, res);
            }
            break;
          case "delete":
            if (req.body.id) {
              deleteExpenseReport(req, res);
            }
            break;
          default:
            break;
        }
      }

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
