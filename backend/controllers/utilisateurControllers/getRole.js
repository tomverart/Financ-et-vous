const Role = require('../../model/role.model.js');
const User = require('../../model/utilisateur.model');

// Renvoie les notes de frais lié à un employé
async function toExport (userId) {
  var userRole = await User.selectByIdUtilisateurs(userId);

  return userRole[0].idrole;
}

module.exports = toExport;
