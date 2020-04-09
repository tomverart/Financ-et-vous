const database = require('./initBDD');
const Role = require('./role.model.js');

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
  static async createUtilisateurs (loginUtilisateur, mdpUtilisateur, nomUtilisateur, prenomUtilisateur, idRole) {
    try {
      // Vérifie si le rôle existe, si il n'existe pas, renvoie une erreur
      if (await Role.selectByIdRoles(idRole) === undefined) throw new Error("L'idRole est incorrect.");

      // Création de l'utilisateur
      const result = await database.client.query({
        text: `
              INSERT INTO ${UTILISATEUR.tableName} (loginUtilisateur, mdpUtilisateur, nomUtilisateur, prenomUtilisateur, idRole) VALUES ($1, $2, $3, $4, $5)`,
        values: [loginUtilisateur, mdpUtilisateur, nomUtilisateur, prenomUtilisateur, idRole]
      });
      console.log(result.rows);
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
  }

  static async selectByIdUtilisateurs (idUtilisateur) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${UTILISATEUR.tableName} where idUtilisateur = ($1)`,
      values: [idUtilisateur]
    });
    console.log(result.rows);
  }
}

/** @type {String} **/
UTILISATEUR.tableName = 'UTILISATEUR';

module.exports = UTILISATEUR;
