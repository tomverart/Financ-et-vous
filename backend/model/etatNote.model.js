const database = require('./initBDD');

class ETATNOTE {
  static toSqlTable () {
    return `
        CREATE TABLE ${ETATNOTE.tableName} (
            -- idEtatNote, stringEtatNote
            idEtatNote SERIAL PRIMARY KEY,
            stringEtatNote VARCHAR
        )
    `;
  }

  static async createEtatNotes (newEtatNote) {
    const result = await database.client.query({
      text: `
            INSERT INTO ${ETATNOTE.tableName} (stringEtatNote) VALUES ($1)`,
      values: [newEtatNote]
    });
    console.log(result);
  }

  static async selectAllEtatNotes () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${ETATNOTE.tableName}`
    });
    console.log(result);
  }

  static async selectByIdEtatNotes (idEtatNote) {
    const result = await database.client.query({
      text: `
            SLECT * FROM ${ETATNOTE.tableName} where idEtatNote = ($1)`,
      values: [idEtatNote]
    });
    console.log(result);
  }
}

/** @type {String} **/
ETATNOTE.tableName = 'ETATNOTE';

module.exports = ETATNOTE;
