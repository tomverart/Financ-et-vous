const database = require('./initBDD');
const UTILISATEUR = require('./utilisateur.model.js');
const ETATNOTE = require('./etatNote.model.js');

class NOTEFRAIS {
  static toSqlTable () {
    return `
        CREATE TABLE ${NOTEFRAIS.tableName} (
            -- idNoteFrais, #idUtilisateur, #idEtatNote

            idNoteFrais SERIAL PRIMARY KEY,
            idUtilisateur INTEGER REFERENCES ${UTILISATEUR.tableName}(idUtilisateur),
            idEtatNote INTEGER REFERENCES ${ETATNOTE.tableName}(idEtatNote)
        )
    `;
  }

  static async createNoteFrais (newNoteFrais) {
    const result = await database.client.query({
      text: `
            INSERT INTO ${NOTEFRAIS.tableName} (stringNoteFrais) VALUES ($1)`,
      values: [newNoteFrais]
    });
    console.log(result.rows);
  }

  static async deleteNoteFrais (idNoteFrais) {
    const result = await database.client.query({
      text: `
            DELETE FROM ${NOTEFRAIS.tableName} where idNoteFrais = ($1)`,
      values: [idNoteFrais]
    });
    console.log(result.rows);
  }

  static async selectAllNoteFrais () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${NOTEFRAIS.tableName}`
    });
    console.log(result.rows);
  }

  static async selectByIdNoteFrais (idNoteFrais) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${NOTEFRAIS.tableName} where idNoteFrais = ($1)`,
      values: [idNoteFrais]
    });
    console.log(result.rows);
  }
}

/** @type {String} **/
NOTEFRAIS.tableName = 'NOTEFRAIS';

module.exports = NOTEFRAIS;
