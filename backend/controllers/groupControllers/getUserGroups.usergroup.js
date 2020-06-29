const usergroup = require('../../model/usergroup.model.js');

// Renvoie tous les groupes d'employés
async function toExport (req, res) {
  var toSend = await usergroup.selectAllGroups();
  res.json(toSend);
}

module.exports = toExport;
