const express = require("express");
const app = express();
const port = 5001;
const knex = require('knex');
const dbConfig = require('./knexfile');
const puppeteer = require('puppeteer');

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
    

    // Route to generate PDF using Puppeteer
app.get('/api/companies/generate-pdf/:companyId', async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const url = `http://localhost:3000/api/companies/${companyId}`; // Replace with the actual URL of your Vue.js app
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the page viewport and navigate to the company page
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close the browser
    await browser.close();

    // Log statements
    console.log(`PDF generated for Company ID: ${companyId}`);
    
    // Send the PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});



  app.listen(port, () => {
    console.log(`App listening on port:${port}`);
  });

 
  