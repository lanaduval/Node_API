require("dotenv").config();
axios = require("axios");
 knex = require("knex");



const fetchAndStore = async () => {
 try {
    const response =  await  axios.get(process.env.API_URL)
if (response.status === 200 && response.data) {
const companies = response.data.results;
const companiesToInsert = companies.map((company) => {
    return {
        nom_raison_sociale: company.nom_raison_sociale,
        geo_adresse: company.siege.geo_adresse,
        date_creation: company.siege.date_creation,
    };
});

    // Insert companies into the "companies" table using knex.

    await knex('companies')
    .insert(companiesToInsert);
    console.log('Companies inserted successfully.');
    await knex.destroy();
    console.log('Database connection closed.');



}
 } catch (error) { console.error("Une erreur est survenue:", error.message);}

};

fetchAndStore();


// Insertion des données dans la base de données en ignorant les doublons


/*
  const store =  await knex('companies').insert({

    nom_raison_sociale: companiesToInsert.nom_raison_sociale,
    geo_adresse: companiesToInsert.geo_adresse,
    date_creation: companiesToInsert.date_creation,
  }).onConflict('nom_raison_sociale').ignore();
      console.log('Données importées avec succès !');
    } else {
      console.error('Erreur lors de la récupération des données depuis l\'API.');
    
   
 }} catch (error) {
    console.error("Une erreur est survenue:", error.message);
  }



};

fetchAndStore();



module.exports = fetchAndStore;


    /*
    try {
   const response = await axios.get('https://recherche-entreprises.api.gouv.fr/search?code_postal=69001');

    if (response.status === 200 && response.data.etablissements) {
      const entreprises = response.data.etablissements;
      const entreprisesToInsert = entreprises.map((entreprise) => {
        return {
          nom: entreprise.nom,
          adresse: entreprise.adresse_ligne_1,
          // Ajoutez d'autres colonnes pour les données pertinentes que vous souhaitez conserver
        };
      });

      // Insertion des données dans la base de données en ignorant les doublons
      await db(tableName).insert(entreprisesToInsert).onConflict('nom').ignore();
      console.log('Données importées avec succès !');
    } else {
      console.error('Erreur lors de la récupération des données depuis l\'API.');
    }
  } catch (error) {
    console.error('Une erreur est survenue:', error.message);
  }
};*/