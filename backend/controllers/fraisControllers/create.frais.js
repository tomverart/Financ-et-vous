var fraisModel = require('../../model/frais.model');

var fs = require('fs');

var pathImages = './ressources/imagesFrais/';

async function toExport (req, res) {
  // console.log("smh");
  console.log(req.body);
  try {
    let newFileName = await fraisModel.getMaxIdFrais();
    newFileName++;
    console.log(newFileName);
    const file = pathImages + newFileName + req.file.originalname.slice(req.file.originalname.lastIndexOf('.', req.file.originalname.length));
    console.log(file);
    fs.rename(req.file.path, file, (err) => {
      if (err) {
        res.status(401).send('erreur fichier');
        return;
      }
    });

    
    fraisModel.createFrais(req.body.montantfrais, req.body.descfrais, file, req.body.idnotefrais);
  }
  catch (err) {
    res.status(401).send(err);
  }
  res.sendStatus(200);
}

module.exports = toExport;
