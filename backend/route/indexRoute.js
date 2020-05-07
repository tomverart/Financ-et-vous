var express = require('express');
var router = express.Router();

// Template de controlleur get
var getBase = require('../controllers/baseControllers/get.base');

// Controlleurs des notes de frais
var getNoteFraisComptable = require('../controllers/noteFraisControllers/getComptable.notefrais');
var updateNoteFrais = require('../controllers/noteFraisControllers/update.notefrais');
var getEtatNote = require('../controllers/etatNoteControllers/get.etatNote');

var getUtilisateur = require('../controllers/utilisateurControllers/get.utilisateur.js');
// Template de base pour routing
router.get('/base', getBase);
// router.post('/', (req, res) => {
// });
router.post('/utilisateur', getUtilisateur);

router.use((req,res, next) => {
  if(req.session.userId){    
    console.log('salut a tous c squezzie');

    next();
    return;
  } 
  res.sendStatus(401);
})

router.get('/noteFrais', getNoteFraisComptable);
router.put('/noteFrais', updateNoteFrais);

router.get('/etatNote', getEtatNote);
// router.delete('/', (req, res) => {
// });

// Renvoie une erreur 404 en cas de requête avec une route inconnue
router.get('/*', function (req, res) {
  console.log(404);
  res.sendStatus(404);
});

module.exports = router;
