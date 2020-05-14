const Notefrais = require('../../model/noteFrais.model.js');

// Renvoie les notes de frais lié à un employé
async function toExport (req, res) {
  const [{ value: year },,{ value: month },,{ value: day },,{ value: hour },,{ value: minute }] = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).formatToParts(Date.now());
  
  let publishDate = new Date(Date.UTC(year, month-1, day, hour, minute));
  var expensereports = await Notefrais.createNoteFrais(req.params.userId, req.body.label, req.body.description, publishDate);
  console.log(publishDate)
  
  res.json(expensereports);
}

module.exports = toExport;
