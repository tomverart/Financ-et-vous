const NoteFrais = require('../../model/noteFrais.model.js');
const User = require('../../model/utilisateur.model.js');

async function toExport(req, res) {
  // Vérifie si la note de frais existe
  if (!await NoteFrais.existsByIdNoteFrais(req.body.idNoteFrais) && !await NoteFrais.existsByIdNoteFrais(req.body.idnotefrais)) {
    res.status(401).send('Note de frais inconnue.');
    return;
  }
  // Met à jour la note de frais à partir des valeurs du body
  var userDatas = User.selectByLogin(req.session.login);
  userDatas.then((user) => {
    currentUser = user[0];
    if (currentUser.idrole === 3) {
      NoteFrais.modifyByIdNoteFrais(req.body.idnotefrais, req.body.libelle, req.body.description);
      res.json("Done");
    } else {
      NoteFrais.updateByIdNoteFrais(req.body.idNoteFrais, req.body.idEtatNote);
      res.json("Done");
    }
  }).catch((err) => {
    console.log("Error of updating: ", err);
    res.status(404);
  })
}

module.exports = toExport;
