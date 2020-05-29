var fraisModel = require('../../model/frais.model');

var fs = require('fs');

var pathImages = './ressources/imagesFrais/';

// Création d'un frais
async function toExport (req, res) {
  // Gestion du fichier
  try {
    // Récupère le plus grand Id des frais. Ne pas utiliser sur une application où il y a plus de 2 personnes connectées en même temps.
    let newFileName = await fraisModel.getMaxIdFrais();
    newFileName++;
    // Crée le chemin pour le nouveau fichier à partir de pathImages, de l'id max des frais et de l'extension du fichier.
    const file = pathImages + newFileName + req.file.originalname.slice(req.file.originalname.lastIndexOf('.', req.file.originalname.length));
    // Déplace et renomme le fichier temporaire vers le chemin renseigné au dessus
    fs.rename(req.file.path, file, (err) => {
      if (err) {
        res.status(401).send('erreur fichier');
        return;
      }
    });

    // Crée le frais
    fraisModel.createFrais(req.body.montantfrais, req.body.descfrais, file, req.body.idnotefrais);
  }
  catch (err) {
    res.status(401).send(err);
  }
  res.sendStatus(200);
}

module.exports = toExport;
