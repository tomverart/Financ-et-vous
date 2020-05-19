const User = require('../../model/utilisateur.model');

// Renvoie les notes de frais lié à un employé
async function toExport (userId) {
  var userRole = await User.selectByLogin(userId);

  return userRole[0];
}

module.exports = toExport;
