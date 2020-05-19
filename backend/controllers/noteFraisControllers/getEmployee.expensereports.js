const Notefrais = require('../../model/noteFrais.model.js');

// Renvoie les notes de frais lié à un utilisateur
async function toExport (req, res) {
  var expensereports = await Notefrais.selectByUserId(req.session.userId);

  res.json(expensereports);
}

module.exports = toExport;
