const Notefrais = require('../../model/noteFrais.model.js');
const Frais = require('../../model/frais.model.js');
const User = require('../../model/utilisateur.model.js')

// Retourne une note de frais grâce à son id req.query.id
async function toExport(req, res) {
  let reports = [];

  //récupération des NF associées à l'utilisateur
  var theReport = await Notefrais.selectByIdNoteFrais(req.query.id);

  //récupération des frais associés
  var expensesRelated = await Frais.selectByIdNoteFrais(req.query.id);
  let them = [];
  for (let j = 0; j < expensesRelated.length; j++) {
    if (expensesRelated[j].idnotefrais === theReport.idnotefrais)
      them.push(expensesRelated[j]);
  }

  //création de la réponse
  reports.push({ report: theReport, expenses: them });

  res.json(reports);
}

module.exports = toExport;
