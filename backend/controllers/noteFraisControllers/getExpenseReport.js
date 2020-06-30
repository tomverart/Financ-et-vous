const Notefrais = require('../../model/noteFrais.model.js');
const Frais = require('../../model/frais.model.js');

// Retourne une notes de frais gràace à son id "id" dans la query string
async function toExport(req, res) {
  let theReport = {
    expenseReport: {},
    expenses: []
  };

  //récupération des informations relatives à la NF
  theReport.expenseReport = await Notefrais.selectByIdNoteFrais(req.query.id);

  //récupération des frais associés à cette NF
  theReport.expenses = await Frais.selectByIdNoteFrais(req.query.id);

  res.json(theReport);
}

module.exports = toExport;
