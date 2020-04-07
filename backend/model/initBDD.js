const pg = require('pg');
const pgtools = require('pgtools');

const config = require('../config/db.config.js');

class InitBDD {
  async init () {
    this.pool = new pg.Pool(config.postgres);
    this.client = await this.pool.connect();
    console.log('Connecté.');
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
        // console.log(q);
        await this.pool.query(q);
      }
    }
  }

  async initBaseValuesRole () {
    const nomsRoles = [
      'Administrateur',
      'Comptable',
      'Employé'
    ];

    for (let i = 0; i < nomsRoles.length; i++) {
      await this.pool.query({
        text: 'INSERT INTO ROLE(stringRole) VALUES($1)',
        values: [nomsRoles[i]]
      }
      );
    }

    const Role = require('./role.model.js');
    Role.selectAllRoles();
  }

  async initBaseValuesEtatsNotes () {
    const nomsRoles = [
      'En attente',
      'Acceptée',
      'Refusée'
    ];

    const etatNote = require('./etatNote.model.js');

    for (let i = 0; i < nomsRoles.length; i++) {
      await etatNote.createEtatNotes(nomsRoles[i]);
    }

    etatNote.selectAllEtatNotes();
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

    await this.initBaseValuesRole();
    await this.initBaseValuesEtatsNotes();
    console.log('bravo ca marche');
  }
}

module.exports = new InitBDD();
