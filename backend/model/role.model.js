const database = require('./initBDD');

class ROLE {
  static toSqlTable () {
    return `
        CREATE TABLE ${ROLE.tableName} (
            -- idRole, stringRole
            idRole SERIAL PRIMARY KEY,
            stringRole VARCHAR
        )
    `;
  }

  static async createRoles (newRole) {
    const result = await database.client.query({
      text: `
            INSERT INTO ${ROLE.tableName} (stringRole) VALUES ($1)`,
      values: [newRole]
    });
    console.log(result);
  }

  static async selectAllRoles () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${ROLE.tableName}`
    });
    console.log(result);
  }

  static async selectByIdRoles (idRole) {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${ROLE.tableName} where idRole = ($1)`,
      values: [idRole]
    });
    console.log(result);
  }
}

/** @type {String} **/
ROLE.tableName = 'ROLE';

module.exports = ROLE;
