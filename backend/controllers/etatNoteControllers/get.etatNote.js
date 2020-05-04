const etatNote = require('../../model/etatNote.model.js');

async function toExport (req, res) {
  // console.log('Working');
  var toSend = await etatNote.selectAllEtatNotes();
  res.json(toSend);
}

module.exports = toExport;
