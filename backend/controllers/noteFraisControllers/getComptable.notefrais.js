const NoteFrais = require('../../model/noteFrais.model.js');

// Renvoie toutes les notes de frais
async function toExport (req, res) {
  var toSend = await NoteFrais.selectNomPrenomAllNoteFrais();
  res.json(toSend);
}

module.exports = toExport;
