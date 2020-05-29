const Notefrais = require('../../model/noteFrais.model.js');
const User = require('../../model/utilisateur.model');

// Renvoie les notes de frais lié à un utilisateur
async function toExport (req, res) {
  var user = await User.selectByLogin(req.session.login);

  var expensereports = await Notefrais.selectByUserId(user[0].idutilisateur);
  
  res.json(expensereports);  
}

module.exports = toExport;
