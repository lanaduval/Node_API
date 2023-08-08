const express = require('express');
const router = express.Router();
const controllerCompanies = require('../../controllers/companies/controllerCompanies');


router.get('/api/companies', controllerCompanies.getCompanies);
router.get('/api/companies/:id', controllerCompanies.getCompanyById);
router.get('/api/companies/generate-pdf/:companyId', controllerCompanies.generatePDF);

module.exports = router;