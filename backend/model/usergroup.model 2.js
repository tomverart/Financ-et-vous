const database = require('./initBDD');

class USERGROUP {
  static toSqlTable () {
    return `
        CREATE TABLE ${USERGROUP.tableName} (
            -- idGroup, stringGroup
            idGroup SERIAL PRIMARY KEY,
            stringGroup VARCHAR
        )
    `;
  }

  static async createGroup (newGroup) {
    // const result =
    await database.client.query({
      text: `
            INSERT INTO ${USERGROUP.tableName} (stringGroup) VALUES ($1)`,
      values: [newGroup]
    });
    // console.log(result.rows);
  }

  static async selectAllGroups () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${USERGROUP.tableName}`
    });
    return result.rows;
  }

  static async selectByIdGroups (idGroup) {
    const result = await database.client.query({
      text: `
            SELECT stringGroup FROM ${USERGROUP.tableName} where idGroup = ($1)`,
      values: [idGroup]
    });
    return result.rows[0].stringGroup;
  }
}

/** @type {String} **/
USERGROUP.tableName = 'USERGROUP';

module.exports = USERGROUP;
