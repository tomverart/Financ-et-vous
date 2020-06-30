const database = require('./initBDD');
const Role = require('./role.model.js');
const utilisateurGroup = require('./utilisateurGroup.model');

class UTILISATEUR {
  static toSqlTable () {
    return `
        CREATE TABLE ${UTILISATEUR.tableName} (
            -- idUtilisateur, loginUtilisateur, mdpUtilisateur, nomUtilisateur, prenomUtilisateur, #idRole

            idUtilisateur SERIAL PRIMARY KEY,
            loginUtilisateur VARCHAR,
            mdpUtilisateur VARCHAR,
            nomUtilisateur VARCHAR,
            prenomUtilisateur VARCHAR,
            idRole INTEGER REFERENCES ${Role.tableName}(idRole)
        )
    `;
  }

  // Création d'un utilisateur
  static async createUtilisateurs (loginUtilisateur, mdpUtilisateur, nomUtilisateur, prenomUtilisateur, idRole, idgroup) {
    try {
      // Vérifie si le rôle existe, si il n'existe pas, renvoie une erreur
      if (!await Role.existsByIdRole(idRole)) throw new Error("L'idRole est incorrect.");
      
      const sha = require('sha256');
      mdpUtilisateur = mdpUtilisateur + sha(loginUtilisateur);
      // Création de l'utilisateur
      const idut = await database.client.query({
        text: `
              INSERT INTO ${UTILISATEUR.tableName} (loginUtilisateur, mdpUtilisateur, nomUtilisateur, prenomUtilisateur, idRole) VALUES ($1, $2, $3, $4, $5) RETURNING idUtilisateur`,
        values: [loginUtilisateur, mdpUtilisateur, nomUtilisateur, prenomUtilisateur, idRole]
      });

      // Ajoute l'utilisateur au groupe renseigné
      utilisateurGroup.createUtilisateurGroup(idut.rows[0].idutilisateur, idgroup);

    } catch (err) {
      console.log(err);
    }
  }

  static async deleteUtilisateurs (idUtilisateur) {
    const result = await database.client.query({
      text: `
            DELETE FROM ${UTILISATEUR.tableName} where idUtilisateur = ($1)`,
      values: [idUtilisateur]
    });
    console.log(result.rows);
  }

  static async selectAllUtilisateurs () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${UTILISATEUR.tableName}`
    });
    console.log(result.rows);
    return result.rows;
  }

  static async selectByIdUtilisateurs (idUtilisateur) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${UTILISATEUR.tableName} where idUtilisateur = ($1)`,
      values: [idUtilisateur]
    });

    return result.rows;
  }

  static async selectByLogin (userLogin) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${UTILISATEUR.tableName} where loginutilisateur = ($1)`,
      values: [userLogin]
    });

    return result.rows;
  }

  /** faire un requette lié pour retourner l'id ET le role du l'utilisateur si le mdp et login concordent
 *
 */
static async userAuth (login, password) {
  // console.log(login, password);
  const sha = require('sha256');
  password = password + sha(login);
  const result = await database.client.query({
    text: `
    SELECT loginutilisateur, stringrole
    FROM ${UTILISATEUR.tableName} uti INNER JOIN ${Role.tableName} role ON (uti.idRole = role.idRole)
    WHERE loginutilisateur = $1
    AND mdputilisateur = $2 `,
    values: [login, password]
  });
  // console.log(result.rows[0]);
  return result.rows[0];
}
}

/** @type {String} **/
UTILISATEUR.tableName = 'UTILISATEUR';

module.exports = UTILISATEUR;
