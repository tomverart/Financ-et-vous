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

  static async createUtilisateurs (newUtilisateur) {
    const result = await database.client.query({
      text: `
            INSERT INTO ${UTILISATEUR.tableName} (stringUtilisateur) VALUES ($1)`,
      values: [newUtilisateur]
    });
    console.log(result);
  }

  static async deleteUtilisateurs (idUtilisateur) {
    const result = await database.client.query({
      text: `
            DELETE FROM ${UTILISATEUR.tableName} where idUtilisateur = ($1)`,
      values: [idUtilisateur]
    });
    console.log(result);
  }

  static async selectAllUtilisateurs () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${UTILISATEUR.tableName}`
    });
    console.log(result);
  }

  static async selectByIdUtilisateurs (idUtilisateur) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${UTILISATEUR.tableName} where idUtilisateur = ($1)`,
      values: [idUtilisateur]
    });
    console.log(result);
  }
}

/** @type {String} **/
UTILISATEUR.tableName = 'UTILISATEUR';

module.exports = UTILISATEUR;
