const database = require('./initBDD');
const UTILISATEUR = require('./utilisateur.model.js');
const ETATNOTE = require('./etatNote.model.js');
const FRAIS = require('./frais.model.js');

class NOTEFRAIS {
  static toSqlTable() {
    return `
        CREATE TABLE ${NOTEFRAIS.tableName} (
            -- idNoteFrais, #idUtilisateur, #idEtatNote

            idNoteFrais SERIAL PRIMARY KEY,
            idUtilisateur INTEGER REFERENCES ${UTILISATEUR.tableName}(idUtilisateur),
            libelle VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            date DATE NOT NULL,
            idEtatNote INTEGER REFERENCES ${ETATNOTE.tableName}(idEtatNote) DEFAULT 1
        )
    `;
  }

  static async createNoteFrais(userId, label, description, publishDate) {
    const result = await database.client.query({
      text: `
            INSERT INTO ${NOTEFRAIS.tableName}(idutilisateur, libelle, description, date) VALUES ($1, $2, $3, $4) RETURNING idNoteFrais`,
      values: [userId, label, description, publishDate]
    });
    return result.rows[0];
  }

  static async deleteNoteFrais(idNoteFrais) {
    //récupération des frais associés à cette NF
    let relatedExpenses = await FRAIS.selectByIdNoteFrais(idNoteFrais);

    //suppression des frais associés à cette NF s'il y en a
    if (relatedExpenses.length > 0) {
      relatedExpenses.forEach((exps) => {
          FRAIS.deleteByIdNoteFrais(exps.idnotefrais);
      });
    }

    //supression de cette NF
    const result = await database.client.query({
      text: `
            DELETE FROM ${NOTEFRAIS.tableName} where idNoteFrais = ($1)`,
      values: [idNoteFrais]
    });
  }

  static async selectAllNoteFrais() {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${NOTEFRAIS.tableName}`
    });
    console.log(result.rows);
    return result.rows;
  }

  static async selectNomPrenomMontantAllNoteFrais() {
    const result = await database.client.query({
      text: `
      SELECT ntfrais.idnotefrais, ntfrais.idutilisateur, uti.nomUtilisateur, uti.prenomUtilisateur, ntfrais.libelle, ntfrais.description, ntfrais.date, ntfrais.idetatnote, sum(frais.montantfrais) montant
      FROM ${NOTEFRAIS.tableName} ntfrais, frais, UTILISATEUR uti
      where frais.idnotefrais = ntfrais.idnotefrais
      and ntfrais.idutilisateur = uti.idutilisateur
      GROUP BY ntfrais.idnotefrais, uti.idutilisateur
      ORDER BY ntfrais.idnotefrais DESC`
    });
    // console.log(result.rows);
    return result.rows;
  }


  static async selectAllNoteFraisByIdEtatNote(idEtatNote) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${NOTEFRAIS.tableName} WHERE idEtatNote = ($1)`,
      values: [idEtatNote]
    });
    console.log(result.rows);
  }

  static async selectByUserId(idUser) {
    const result = await database.client.query({
      /* text: `
      SELECT ${NOTEFRAIS.tableName}.idnotefrais, ${NOTEFRAIS.tableName}.idutilisateur, ${NOTEFRAIS.tableName}.libelle, ${NOTEFRAIS.tableName}.description, ${NOTEFRAIS.tableName}.date, ${NOTEFRAIS.tableName}.idetatnote, sum(frais.montantfrais) montant
      FROM NOTEFRAIS, frais
      where frais.idnotefrais = ${NOTEFRAIS.tableName}.idnotefrais 
      and idutilisateur = ($1)
      GROUP BY ${NOTEFRAIS.tableName}.idnotefrais 
      ORDER BY NOTEFRAIS.idnotefrais DESC`, */
      text: `SELECT * FROM ${NOTEFRAIS.tableName} WHERE idutilisateur = ($1)`,
      values: [idUser]
    });

    return result.rows;
  }

  static async selectByIdNoteFrais(idNoteFrais) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${NOTEFRAIS.tableName} where idNoteFrais = ($1)`,
      values: [idNoteFrais]
    });

    return result.rows[0];
  }

  static async modifyByIdNoteFrais(idNoteFrais, label, description) {
    await database.client.query({
      text: `
            UPDATE ${NOTEFRAIS.tableName} SET libelle = ($1), description = ($2) WHERE idNoteFrais = ($3)`,
      values: [label, description, idNoteFrais]
    });
  }

  static async updateByIdNoteFrais(idNoteFrais, idEtatNote) {
    // const result = await database.client.query({
    await database.client.query({
      text: `
            UPDATE ${NOTEFRAIS.tableName} SET idEtatNote = ($2) WHERE idNoteFrais = ($1)`,
      values: [idNoteFrais, idEtatNote]
    });
    // console.log(result.rows);
  }

  static async existsByIdNoteFrais(idNoteFrais) {
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
