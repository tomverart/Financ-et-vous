const database = require('./database');
const NOTEFRAIS = require('./noteFrais.model.js');

class FRAIS {
  static toSqltable () {
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
    console.log(result);
  }

  static async deleteFrais (idFrais) {
    const result = await database.client.query({
      text: `
            DELETE FROM ${FRAIS.tableName} where idFrais = ($1)`,
      values: [idFrais]
    });
    console.log(result);
  }

  static async selectAllFrais () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${FRAIS.tableName}`
    });
    console.log(result);
  }

  static async selectByIdFrais (idFrais) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${FRAIS.tableName} where idFrais = ($1)`,
      values: [idFrais]
    });
    console.log(result);
  }
}

/** @type {String} **/
FRAIS.tableName = 'FRAIS';

module.exports = FRAIS;
