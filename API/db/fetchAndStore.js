require('dotenv').config();
const axios = require('axios');
const knex = require('knex');
const knexfile = require('./knexfile'); 


const fetchAndStore = async () => {
  let knexInstance = null;
 
  try {
    let  knexInstance = knex(knexfile.development);
    let page = 1;
    let allCompanies = [];

    // Define the insertCompanies function inside fetchAndStore to catch all companies and not only the first page
    const insertCompanies = async (companies) => {
      try {
        for (const company of companies) {
          const { siren } = company;
          const existingCompany = await knexInstance('companies').where({ siren }).first();
          if (!existingCompany) {
            await knexInstance('companies').insert(company).onConflict('siren').ignore();
            console.log('Company inserted successfully:', company.nom_raison_sociale);
          } else {
            await knexInstance('companies').where({ siren }).update(company);
            console.log('Company updated successfully:', company.nom_raison_sociale);
          }
        }
        console.log('All companies inserted or updated successfully.');
      } catch (err) {
        throw err;
      }
    };
    //add a while loop and params to my get request
    while (true) {
      const response = await axios.get(process.env.API_URL, {
        params: {
          code_postal: '69001',
          page,
        },
      });
      //console.log(response.data.results);
      
 // add some params to check if the response length
      if (response.status === 200 && response.data && response.data.results.length > 0) {
        const companies = response.data.results;
        allCompanies.push(...companies);

        const companiesToInsert = companies.map((company) => {
          return {
            siren: company.siren,
            nom_raison_sociale: company.nom_raison_sociale,
            geo_adresse: company.siege.geo_adresse,
            date_creation: company.siege.date_creation,
          };
        });

        // Increment the page to fetch the next page in my next loop iteration
        page++;

        // Add a delay between each API request to avoid a "too many request" error
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed.

        // Check if we have reached the last page.
        if (page > response.data.total_pages) {
          break;
        }

        // Insert the companies into the table for the current page.
        await insertCompanies(companiesToInsert);
      } else {
        // Break the loop if the response is empty or if we have reached the last page.
        break;
      }
    }

    if (allCompanies.length > 0) {
      console.log('All companies have been fetched.');
      console.log('Total number of companies:', allCompanies.length);

      // Create the "companies" table if it does not exist.
      await createCompaniesTable();

      console.log('Insertion of companies is complete.');
    } else {
      console.log('No companies found.');
    }
  } catch (error) {
    console.error('Error fetching and storing data:', error);
  
} finally {
  if (knexInstance) {
    knexInstance.destroy(); // Close the Knex connection in the finally block
    console.log('Knex connection closed.');
  }
}
};

// ...

// Call the function to fetch and store data.
fetchAndStore();




  
