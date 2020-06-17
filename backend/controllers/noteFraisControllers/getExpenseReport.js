const Notefrais = require('../../model/noteFrais.model.js');

// Retourne une notes de frais gràace à son id "id" dans la query string
async function toExport (req, res) {
  var expensereports = await Notefrais.selectByIdNoteFrais(req.query.id);
  res.json(expensereports);
}

module.exports = toExport;
