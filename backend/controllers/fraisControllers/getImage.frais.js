const Frais = require('../../model/frais.model.js');
const path = require('path');

// Renvoie tous les frais liés à une note de frais
async function toExport (req, res) {

  // Envoie le fichier correspondant à l'adresse renseignée
  res.sendFile(path.join(__dirname, '../../ressources/imagesFrais', req.params.imageName));
}

module.exports = toExport;
