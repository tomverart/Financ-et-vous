const pg = require('pg');
const pgtools = require('pgtools');
const fs = require('fs');
const config = require('../config/db.config.js');

class InitBDD {
  async init () {
    this.pool = new pg.Pool(config.postgres);
    this.client = await this.pool.connect();
    console.log('Connecté.');
  }

  async buildTables () {
    const models = require('./model-by-name.js');
    for (const model of models) {
      // console.log(model);
      const q = model.toSqlTable();
      if (Array.isArray(q)) {
        for (const query of q) {
          // console.log(query);
          await this.pool.query(query);
        }
      } else {
        // console.log(q);
        await this.pool.query(q);
      }
    }
  }

  // Valeurs de bases pour les rôles
  async initBaseValuesRole () {
    const nomsRoles = [
      'Administrateur',
      'Comptable',
      'Employé'
    ];
    const Role = require('./role.model.js');

    for (let i = 0; i < nomsRoles.length; i++) {
      await Role.createRole(nomsRoles[i]);
    }

    await Role.selectAllRoles();
  }

  // Valeurs de bases pour les états des notes
  async initBaseValuesEtatsNotes () {
    const nomsEtatsNotes = [
      'En attente',
      'Acceptée',
      'Refusée'
    ];

    const etatNote = require('./etatNote.model.js');

    for (let i = 0; i < nomsEtatsNotes.length; i++) {
      await etatNote.createEtatNote(nomsEtatsNotes[i]);
    }

    await etatNote.selectAllEtatNotes();
  }

  async testnoteFraisComtpable () {
    const sha = require('sha256');

    // const noteFrais = require('./noteFrais.model');
    const utilisateur = require('./utilisateur.model');
    const usergroup = require('./usergroup.model.js');
    const utilisateurgroup = require('./utilisateurGroup.model.js');

    await usergroup.createGroup('Main group');
    await usergroup.createGroup('Secondary group');

    await utilisateur.createUtilisateurs('JE', sha('soleil123'), 'Jean', 'Michel', 3, 1);
    await utilisateur.createUtilisateurs('JC', sha('soleil123'), 'Jean', 'MichelMichel', 2, 1);

    await utilisateurgroup.createUtilisateurGroup(2, 2);
  }


  // Supprime toutes les images liées aux frais
  clearImagesExpenses () {
    // Chemin des images des frais
    const pathImagesExpenses = './ressources/imagesFrais/';

    // Récupère les noms de tous les fichiers dans le répertoire
    fs.readdir(pathImagesExpenses, function (err, files) {
      // Ignore le .gitkeep
      let findGitKeep = files.indexOf('.gitkeep');
      if (findGitKeep !== -1) {
        files.splice(findGitKeep, 1);
      }

      // Supprime les fichiers
      files.forEach(file => {
        fs.unlink(pathImagesExpenses + file, function (err) {
          if (err) throw err;
          console.log(file + ' supprimé');
        });
      });
    });

  }

  async reset () {
    const conf = {
      user: config.postgres.user,
      host: config.postgres.host,
      password: config.postgres.password

    };
    try {
      await pgtools.dropdb(conf, config.postgres.database);
    } catch (err) {
      console.log("error but don't care", err);
    }

    this.clearImagesExpenses();

    await pgtools.createdb(conf, config.postgres.database);
    await this.init();

    await this.buildTables();

    await this.initBaseValuesRole();
    await this.initBaseValuesEtatsNotes();

    await this.testnoteFraisComtpable();

    console.log('bravo ca marche');
  }
}

module.exports = new InitBDD();
