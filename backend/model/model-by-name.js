const etatNote = require('./etatNote.model.js');
const frais = require('./frais.model.js');
const noteFrais = require('./noteFrais.model.js');
const role = require('./role.model.js');
const utilisateur = require('./utilisateur.model.js');

module.exports = [
  role,
  utilisateur,
  etatNote,
  noteFrais,
  frais
]
;
