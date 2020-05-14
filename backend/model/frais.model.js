const database = require('./initBDD');
const NOTEFRAIS = require('./noteFrais.model.js');

class FRAIS {
  static toSqlTable () {
    return `
        CREATE TABLE ${FRAIS.tableName} (
            -- idFrais, montantFrais, descriptionFrais, fichierFrais, #idNoteFrais

            idFrais SERIAL PRIMARY KEY,
            montantFrais NUMERIC(2),
            descriptionFrais VARCHAR,
            fichierFrais VARCHAR,
            idNoteFrais INTEGER REFERENCES ${NOTEFRAIS.tableName}(idNoteFrais)
        )
    `;
  }

  static async createFrais (newFrais) {
    const result = await database.client.query({
      text: `
            INSERT INTO ${FRAIS.tableName} (stringFrais) VALUES ($1)`,
      values: [newFrais]
    });
    console.log(result.rows);
  }

  static async deleteFrais (idFrais) {
    const result = await database.client.query({
      text: `
            DELETE FROM ${FRAIS.tableName} where idFrais = ($1)`,
      values: [idFrais]
    });
    console.log(result.rows);
  }

  static async selectAllFrais () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${FRAIS.tableName}`
    });
    console.log(result.rows);
  }

  static async selectByIdFrais (idFrais) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${FRAIS.tableName} where idFrais = ($1)`,
      values: [idFrais]
    });
    console.log(result.rows);
  }

  static async selectByIdNoteFrais (idNoteFrais) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${FRAIS.tableName} where idnotefrais = ($1)`,
      values: [idNoteFrais]
    });
    console.log(result.rows);
  }
}

/** @type {String} **/
FRAIS.tableName = 'FRAIS';

module.exports = FRAIS;
