var fraisModel = require('../../model/frais.model');

var fs = require('fs');

var pathImages = './ressources/imagesFrais/';

// Création d'un frais
async function toExport (req, res) {

  if (req.file === undefined) {
    res.status(400).send('Fichier manquant');
    return;
  }
  else {
    // Gestion du fichier
    try {
      // Récupère le plus grand Id des frais. Ne pas utiliser sur une application où il y a plus de 2 personnes connectées en même temps.
      let newFileName = await fraisModel.getMaxIdFrais();
      newFileName++;
      // Crée le chemin pour le nouveau fichier à partir de pathImages, de l'id max des frais et de l'extension du fichier.
      const fileFullPath = pathImages + newFileName + req.file.originalname.slice(req.file.originalname.lastIndexOf('.', req.file.originalname.length));
      // Nom du fichier
      newFileName = newFileName + req.file.originalname.slice(req.file.originalname.lastIndexOf('.', req.file.originalname.length));
      // Déplace et renomme le fichier temporaire vers le chemin renseigné au dessus
      fs.rename(req.file.path, fileFullPath, (err) => {
        if (err) {
          res.status(401).send('erreur fichier');
          return;
        }
        else {
          // Crée le frais
          fraisModel.createFrais(req.body.montantfrais, req.body.descfrais, newFileName, req.body.idnotefrais);
          res.sendStatus(200);
          return;
        }
      });

    }
    catch (err) {
      res.status(401).send(err);
      return;
    }
  }
}

module.exports = toExport;
