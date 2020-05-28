const Notefrais = require('../../model/noteFrais.model.js');
const User = require('../../model/utilisateur.model.js');

// Supprime une note de frais lié à un employé
async function toExport (req, res) {  
  let user = await User.selectByLogin(req.session.login);
  var expensereports = await Notefrais.deleteNoteFrais(req.body.id);

  res.sendStatus(204);
}

module.exports = toExport; 
