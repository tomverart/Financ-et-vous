const Frais = require('../../model/frais.model.js');
const path = require('path');

// Renvoie tous les frais liés à une note de frais
async function toExport (req, res) {

  res.sendFile(path.join(__dirname, '../../ressources/imagesFrais', '1.jpg'));
}

module.exports = toExport;
