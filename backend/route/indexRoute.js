var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './ressources/tempImagesFrais' });

// Template de controlleur get
var getBase = require('../controllers/baseControllers/get.base');

// Controlleurs des notes de frais
var getNoteFraisComptable = require('../controllers/noteFraisControllers/getComptable.notefrais');
var getEmployeeExpenseReports = require('../controllers/noteFraisControllers/getEmployee.expensereports');
var addExpenseReport = require('../controllers/noteFraisControllers/add.expenseReport');
var updateNoteFrais = require('../controllers/noteFraisControllers/update.notefrais');
var getEtatNote = require('../controllers/etatNoteControllers/get.etatNote');

// Controlleurs des frais
var createFrais = require('../controllers/fraisControllers/create.frais');
var getImage = require('../controllers/fraisControllers/getImage.frais');
// Controlleurs utilisateur
var getUtilisateur = require('../controllers/utilisateurControllers/get.utilisateur.js');

router.post('/uploadImage', upload.single('file'), createFrais);
router.get('/downloadImage', getImage);

// Login
router.post('/utilisateur', getUtilisateur);

// router.use((req, res, next) => {
//   console.log(req.session);
//   if (req.session.userId) {
//     next();
//     return;
//   }
//   res.sendStatus(401);
// })


router.get('/employee_dashboard', getNoteFraisComptable);   //changer employee_dashboard en dashboard/accountant et adapter else if
router.get('/dashboard/:userType/:userId', (req, res) => {
  if (req.params.userType === "employee") {
    getEmployeeExpenseReports(req, res);
  } else if (req.params.userType === "accountant") {
    console.log("it's an accountant");
  } else {
    console.log("URL unknown");
  }
});
router.post('/dashboard/:userType/:userId', addExpenseReport);

// Comptable - Note de frais
router.get('/noteFrais', getNoteFraisComptable);
router.post('/noteFrais', updateNoteFrais);

router.get('/etatNote', getEtatNote);


// Renvoie une erreur 404 en cas de requête avec une route inconnue
router.get('/*', function (req, res) {
  console.log(404);
  res.sendStatus(404);
});

module.exports = router;
