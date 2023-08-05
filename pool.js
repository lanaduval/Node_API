require('dotenv').config();
// Initialize knex.
const db = {
    client: 'mysql2',
    connection:{
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    useNullAsDefault: true,
   
}
// add fields

const insertCompanies = () => {
const knex = require('knex')(db);
knex.schema.hasTable('companies').then(function(exists) {
    if (!exists) 
        knex.schema
        .createTable('companies', function (table) {
            table.autoincrements('id').primary();
            table.string('nom_raison_sociale');
            table.string('geo_adresse');
            table.date('date_creation');
        }
        )
        .then(() => console.log('companies table is created in database companies'))
        .catch((err) => {console.log(err)})
        .finally(() => {knex.destroy();
            console.warn('connection is closed');
        });

       
});
};

insertCompanies();

