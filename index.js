const express = require("express");
const app = express();
const port = 3000;
const knex = require('knex');
const dbConfig = require('./knexfile');




app.use(express.json());



// Initialize knex.
const knexInstance = knex(dbConfig.development);

// Route GET pour récupérer toutes les entreprises.
app.get('/api/companies', async (req, res) => {
  try {
    // Récupérer toutes les entreprises depuis la base de données.
    const companies = await knexInstance('companies').select();

    // Renvoyer les entreprises sous forme de réponse JSON.
    res.json(companies);
    console.log(companies);
  } catch (error) {
    console.error('Error cannot get companies:', error);
    res.status(500).json({ error: 'Error cannot get companies' });
  }
});

  app.listen(port, () => {
    console.log(`App listening on port:${port}`);
  });
 