const NoteFrais = require('../../model/noteFrais.model.js');

async function toExport (req, res) {
  // Vérifie si la note de frais existe
  if (!await NoteFrais.existsByIdNoteFrais(req.body.idNoteFrais)) {
    res.status(401).send('Note de frais inconnue.');
    return;
  }

  // Met à jour la note de frais à partir des valeurs du body
  NoteFrais.updateByIdNoteFrais(req.body.idNoteFrais, req.body.idEtatNote);
  res.json('Done');
}

module.exports = toExport;
