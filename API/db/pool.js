const knex = require('knex');
const knexfile = require('./knexfile'); 

// Get the development config from your knexfile.
const dbConfig = knexfile.development;

// Initialize knex.
const knexInstance = knex(dbConfig);

// Create "companies" table if it does not exist.
const createCompaniesTable = async () => {
    try {
      const tableExists = await knexInstance.schema.hasTable('companies');
      if (!tableExists) {
        await knexInstance.schema.createTable('companies', (table) => {
          table.increments('id').primary();
          table.string('siren');
          table.string('nom_raison_sociale');
          table.string('geo_adresse');
          table.date('date_creation');
        });
        console.warn('Companies table is created in the database');
      } else {
        console.warn('Companies table already exists');
      }
    } catch (error) {
      console.error('Error creating companies table:', error);
    } finally {
      // Close the Knex connection after table creation
      knexInstance.destroy();
      console.warn("connection closed");
    }
  };
createCompaniesTable();