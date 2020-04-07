const pg = require('pg');
const pgtools = require('pgtools');

const config = require('../config/db.config.js');

class InitBDD {
  async init () {
    this.pool = new pg.Pool(config.postgres);
    this.client = await this.pool.connect();
  }

  async buildTables () {
    const models = require('./model-by-name.js');
    for (const model of models) {
      // console.log(model);
      const q = model.toSqlTable();
      if (Array.isArray(q)) {
        for (const query of q) {
          // console.log(query);
          await this.pool.query(query);
        }
      } else {
        console.log(q);
        await this.pool.query(q);
      }
    }
  }

  async reset () {
    const conf = {
      user: config.postgres.user,
      host: config.postgres.host,
      password: config.postgres.password

    };
    try {
      await pgtools.dropdb(conf, config.postgres.database);
    } catch (err) {
      console.log("error but don't care", err);
    }
    await pgtools.createdb(conf, config.postgres.database);
    await this.init();

    await this.buildTables();

    console.log('bravo ca marche');
  }
}

module.exports = new InitBDD();
