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

  static async createRole (newRole) {
    // const result =
    await database.client.query({
      text: `
            INSERT INTO ${ROLE.tableName} (stringRole) VALUES ($1)`,
      values: [newRole]
    });
    // console.log(result.rows);
  }

  static async selectAllRoles () {
    const result = await database.client.query({
      text: `
            SELECT * FROM ${ROLE.tableName}`
    });
    console.log(result.rows);
  }

  static async selectByIdRoles (idRole) {
    const result = await database.client.query({
      text: `
            SELECT stringRole FROM ${ROLE.tableName} where idRole = ($1)`,
      values: [idRole]
    });
    return result.rows[0].stringrole;
  }

  static async existsByIdRole (idRole) {
    const result = await database.client.query({
      text: `
            SELECT exists(SELECT 1 FROM ${ROLE.tableName} where idRole = ($1))`,
      values: [idRole]
    });
    return result.rows[0].exists;
  }
}

/** @type {String} **/
ROLE.tableName = 'ROLE';

module.exports = ROLE;
