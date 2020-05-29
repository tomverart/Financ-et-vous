const User = require('../../model/utilisateur.model');

// Renvoie les notes de frais lié à un employé
async function toExport (userLogin) {
  var userRole = await User.selectByLogin(userLogin);

  return userRole[0];
}

module.exports = toExport;
