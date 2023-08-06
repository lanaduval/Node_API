const express = require("express");
const app = express();
const port = 5001;
const knex = require('knex');
const dbConfig = require('./knexfile');
const cors = require('cors');
require('dotenv').config();




app.use(express.json());
app.use(cors({
     origin: process.env.FRONTEND_URL
}));



// Initialize knex.
const knexInstance = knex(dbConfig.development);

// Route GET pour récupérer toutes les entreprises.
app.get('/api/companies', async (req, res) => {
  
  try {

    
    const {name, page} = req.query;
    let query = knexInstance('companies');

    // Query name
    
    if (name) {
      queryName = query.where('nom_raison_sociale', 'like', `%${name}%`);
    }

    if (page) {
      const pageNumber = parseInt(page, 10);
      query = query.limit(10).offset((pageNumber - 1) * 10);
    }

   

    // Récupérer les entreprises en fonction de ma query
    const companies = await query.select();

    // Renvoyer les entreprises sous forme de réponse JSON.
    res.json(companies);
    console.log(companies);
  } catch (error) {
    console.error('Error cannot get companies:', error);
    res.status(500).json({ error: 'Error cannot get companies' });
  }
});

  app.get('/api/companies/:id', async (req, res) => {
      try {
        const companyId = req.params.id;
        const company = await knexInstance('companies').where('id', companyId).first();
    
        if (!company) {
          return res.status(404).json({ error: 'Company not found' });
        }

        res.json(company);
        console.log(company);
      } catch (error) {
        console.error('Error cannot get company by ID:', error);
        res.status(500).json({ error: 'Error cannot get company by ID' });
      }
    });
    
 

  app.listen(port, () => {
    console.log(`App listening on port:${port}`);
  });

 