const Frais = require('../../model/frais.model.js');

// Renvoie tous les frais liés à une note de frais
async function toExport (req, res) {
  var expenses = await Frais.selectByIdNoteFrais(req.body.idnotefrais);

  res.json(expenses);
}

module.exports = toExport;
