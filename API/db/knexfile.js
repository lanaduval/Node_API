require('dotenv').config();

// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: process.env.DB_NAME,
      user:    process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 1,
      max: 1000,
    }
    ,
    useNullAsDefault: true,
  },

  staging: {
  client: 'mysql2',
    connection: {
      database: process.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
    ,
    useNullAsDefault: true,
    pool: {
      min: 1,
      max: 1000,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      database: process.DB_NAME,
      user:    process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
    ,
    useNullAsDefault: true,
    pool: {
      min: 1,
      max: 1000,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
