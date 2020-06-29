const database = require('./initBDD');
const USERGROUP = require('./usergroup.model.js');
const Utilisateur = require('./utilisateur.model.js');

class UTILISATEURGROUP {
  static toSqlTable () {
    // Pour une raison inconnue, cette syntaxe me renvoie une erreur de relation undefined
    // return `
    //     CREATE TABLE ${UTILISATEURGROUP.tableName} (
    //         -- idUtilisateur, idGroup
    //         idUtilisateur INTEGER NOT NULL REFERENCES ${Utilisateur.tableName}(idUtilisateur),
    //         idGroup INTEGER NOT NULL REFERENCES ${USERGROUP.tableName}(idGroup),
    //         PRIMARY KEY(idUtilisateur, idGroup)
    //     )
    // `;
    return `create table UTILISATEURGROUP(
      idUtilisateur integer NOT NULL references utilisateur(idUtilisateur),
      idGroup integer NOT NULL references usergroup(idGroup),
      PRIMARY KEY(idUtilisateur, idGroup))`;
  }

  static async createUtilisateurGroup (idUtilisateur, idGroup) {
    // const result =
    await database.client.query({
      text: `
            INSERT INTO ${UTILISATEURGROUP.tableName} (idUtilisateur, idGroup) VALUES ($1, $2)`,
      values: [idUtilisateur, idGroup]
    });
    // console.log(result.rows);
  }

  static async selectAllUtilisateurGroup () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${UTILISATEURGROUP.tableName}`
    });
    console.log(result.rows);
  }

  static async selectGroupByIdUtilisateur (idUtilisateur) {
    const result = await database.client.query({
      text: `
            SELECT Utilisateur FROM ${UTILISATEURGROUP.tableName} where idUtilisateur = ($1)`,
      values: [idUtilisateur]
    });
    return result.rows;
  }

  static async selectIdUtilisateurByIdGroup (idGroup) {
    const result = await database.client.query({
      text: `
            SELECT Utilisateur FROM ${UTILISATEURGROUP.tableName} where idGroup = ($1)`,
      values: [idGroup]
    });
    return result.rows;
  }
}

/** @type {String} **/
UTILISATEURGROUP.tableName = 'UTILISATEURGROUP';

module.exports = UTILISATEURGROUP;
