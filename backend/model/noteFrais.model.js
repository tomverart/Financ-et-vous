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
            libelle VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            date DATE,
            idEtatNote INTEGER REFERENCES ${ETATNOTE.tableName}(idEtatNote) DEFAULT 1
        )
    `;
  }

  static async createNoteFrais (userId, label, description, publishDate) {
    await database.client.query({
      text: `
            INSERT INTO ${NOTEFRAIS.tableName}(idutilisateur, libelle, description, date) VALUES ($1, $2, $3, $4)`,
      values: [userId, label, description, publishDate]
    });
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
    return result.rows;
  }

  static async selectNomPrenomAllNoteFrais () {
    const result = await database.client.query({
      text: `
            SELECT idNoteFrais, ntfrais.idUtilisateur, idEtatNote, nomUtilisateur, prenomUtilisateur
            FROM ${NOTEFRAIS.tableName} ntfrais INNER JOIN ${UTILISATEUR.tableName} uti ON ntfrais.idUtilisateur = uti.idUtilisateur`
    });
    // console.log(result.rows);
    return result.rows;
  }


  static async selectAllNoteFraisByIdEtatNote (idEtatNote) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${NOTEFRAIS.tableName} WHERE idEtatNote = ($1)`,
      values: [idEtatNote]
    });
    console.log(result.rows);
  }

  static async selectByUserId (idUser) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${NOTEFRAIS.tableName} where idutilisateur = ($1)`,
      values: [idUser]
    });

    return result.rows;
  }

  static async selectByIdNoteFrais (idNoteFrais) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${NOTEFRAIS.tableName} where idNoteFrais = ($1)`,
      values: [idNoteFrais]
    });
    console.log(result.rows);
  }

  static async updateByIdNoteFrais (idNoteFrais, idEtatNote) {
    // const result = await database.client.query({
    await database.client.query({
      text: `
            UPDATE ${NOTEFRAIS.tableName} SET idEtatNote = ($2) WHERE idNoteFrais = ($1)`,
      values: [idNoteFrais, idEtatNote]
    });
    // console.log(result.rows);
  }

  static async existsByIdNoteFrais (idNoteFrais) {
    const result = await database.client.query({
      text: `
            SELECT exists(SELECT 1 FROM ${NOTEFRAIS.tableName} where idNoteFrais = ($1))`,
      values: [idNoteFrais]
    });
    return result.rows[0].exists;
  }
}

/** @type {String} **/
NOTEFRAIS.tableName = 'NOTEFRAIS';

module.exports = NOTEFRAIS;
