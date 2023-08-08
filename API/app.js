const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/companies/router.js');




app.use(express.json());
app.use(cors({
     origin: process.env.FRONTEND_URL,
     optionsSuccessStatus: 200,
    credentials: true,
}));

app.use(router);


app.listen(`${process.env.APP_PORT}`, () => {
    console.log(`App listening on port:${process.env.APP_PORT}`);
  });


