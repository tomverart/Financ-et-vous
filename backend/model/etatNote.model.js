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

  static async createEtatNote (newEtatNote) {
    // const result =
    await database.client.query({
      text: `
            INSERT INTO ${ETATNOTE.tableName} (stringEtatNote) VALUES ($1)`,
      values: [newEtatNote]
    });
    // console.log(result.rows);
  }

  static async selectAllEtatNotes () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${ETATNOTE.tableName}`
    });
    // console.log(result.rows);
    return result.rows;
  }

  static async selectByIdEtatNotes (idEtatNote) {
    const result = await database.client.query({
      text: `
            SLECT * FROM ${ETATNOTE.tableName} where idEtatNote = ($1)`,
      values: [idEtatNote]
    });
    console.log(result.rows);
  }
}

/** @type {String} **/
ETATNOTE.tableName = 'ETATNOTE';

module.exports = ETATNOTE;
