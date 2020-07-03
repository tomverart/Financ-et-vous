const Notefrais = require('../../model/noteFrais.model.js');
const Frais = require('../../model/frais.model');
const User = require('../../model/utilisateur.model');
const { report } = require('../../route/indexRoute.js');

// Renvoie les notes de frais lié à un utilisateur
async function toExport(req, res) {
  let reports = [];
  var user = await User.selectByLogin(req.session.login);

  //récupération des NF associées à l'utilisateur
  var allReports = await Notefrais.selectByUserId(user[0].idutilisateur);

  //récupération des frais associés aux NF
  var expensesRelated = await Frais.selectAllFrais();
  for (let i = 0; i < allReports.length; i++) {
    let them = [];

    for (let j = 0; j < expensesRelated.length; j++) {
      if (expensesRelated[j].idnotefrais === allReports[i].idnotefrais)
        them.push(expensesRelated[j]);
    }

    //création de la réponse
    reports.push({ report: allReports[i], expenses: them });
  }

  res.json(reports);
}

module.exports = toExport;
