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

  static async createFrais (montantFrais, descriptionFrais, fichierFrais, idNoteFrais) {
    await database.client.query({
      text: `
            INSERT INTO ${FRAIS.tableName} (montantFrais, descriptionFrais, fichierFrais, idNoteFrais) VALUES ($1, $2, $3, $4)`,
      values: [montantFrais, descriptionFrais, fichierFrais, idNoteFrais]
    });
    return;
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

  static async getMaxIdFrais(){
    const result = await database.client.query({
      text:`
        SELECT max(idFrais) FROM ${FRAIS.tableName};
      `
    });
    let maxId = result.rows[0].max;
    // if(maxId === null) console.log(0);
    if(maxId === null) return 0;
    // else console.log(maxId);
    else return maxId;
  
  }
}

/** @type {String} **/
FRAIS.tableName = 'FRAIS';

module.exports = FRAIS;
