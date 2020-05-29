const etatNote = require('../../model/etatNote.model.js');

// Renvoie la liste des états
async function toExport (req, res) {
  var toSend = await etatNote.selectAllEtatNotes();
  res.json(toSend);
}

module.exports = toExport;
