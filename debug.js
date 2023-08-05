require('dotenv').config();
const axios = require('axios');
const knex = require('knex');
const knexfile = require('./knexfile'); // Update the path to your knexfile

// Get the development config from your knexfile.
const dbConfig = knexfile.development;

// Initialize knex.
const knexInstance = knex(dbConfig);

// Create "companies" table if it does not exist.
const createCompaniesTable = async () => {
  const tableExists = await knexInstance.schema.hasTable('companies');
  if (!tableExists) {
    return knexInstance.schema.createTable('companies', (table) => {
      table.increments('id').primary();
      table.string('siren');
      table.string('nom_raison_sociale');
      table.string('geo_adresse');
      table.date('date_creation');
    });
  }
  console.warn('Companies table is created in database companies');
};

// Insert companies into the "companies" table.
const insertCompanies = async (companies) => {
  try {
    for (const company of companies) {
    const {siren} = company;
    const existingCompany = await knexInstance('companies').where({siren}).first();
    if (!existingCompany) {
    await knexInstance('companies').insert(companies).onConflict('siren').ignore();
    console.log('Companies inserted successfully.');
    } else {
        // mettre à jour l'entrée existante, vous pouvez le faire comme suit :
    await knexInstance('companies').where({ siren }).update(company);
      }
    }
    console.log('Companies inserted successfully.');
  } catch (err) {
    console.error('Error inserting companies:', err);
  } finally {
    // Close the database connection.
    knexInstance.destroy();
    console.warn('Connection is closed.');
  }
};

const fetchAndStore = async () => {
  try {
    const response = await axios.get(process.env.API_URL);
    if (response.status === 200 && response.data) {
      const companies = response.data.results;
      const companiesToInsert = companies.map((company) => {
        return {
          siren: company.siren,  
          nom_raison_sociale: company.nom_raison_sociale,
          geo_adresse: company.siege.geo_adresse,
          date_creation: company.siege.date_creation,
        };
      });

      await createCompaniesTable(); // Create "companies" table if not exists.
      await insertCompanies(companiesToInsert); // Insert companies into the table.
    }
  } catch (error) {
    console.error('Error fetching and storing data:', error);
  }
};

// Call the function to fetch and store data.
fetchAndStore();
