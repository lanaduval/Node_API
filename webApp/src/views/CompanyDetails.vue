<!---------------- TEMPLATE NCARD DETAILS : ONE CARD ----->
<template>
    <div>
        <n-space vertical>
        <n-card :title="companyDetails.nom_raison_sociale"  >
            <template #cover>
                <img :src="mapImageUrl" alt="Company Location" />
            </template>
      <p>Addresse: {{ companyDetails.geo_adresse }}</p> 

        <p>Date de création:  {{ formattedDate }}</p>
        <p>SIREN: {{ companyDetails.siren }}</p>

        </n-card>
      <router-link :to="{ name: 'CompanyCard'}">
  <n-button type="primary" ghost>
    Back
  </n-button>
</router-link>
</n-space>
    </div>
  </template>

 <!--- STYLE TO CUSTOMIZE MY NAIVE UI COMPONENTS -->  
 
 <style scoped>

.n-button {
  margin: 0.25rem;
  &:hover {
    background-color: hsla(160, 38%, 61%, 0.103);
  }
}

.n-card {
    padding: 0.5rem;
    height: 40rem;
    background-color: rgba(219, 218, 226, 0.03);
}

</style>


<!----------------- SCRIPT------------------>  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';


  const route = useRoute();
  const companyId = route.params.id; // Access the ID from the route params

const companyDetails = ref([]);
const mapImageUrl = ref('');
const formattedDate = ref('');

  
  
onMounted(async () => {

   
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
  try {
    const response = await axios.get(`http://localhost:5001/api/companies/${companyId}`);
    companyDetails.value = response.data;

    

    // Generate the URL for the static map image
    const address = encodeURIComponent(companyDetails.value.geo_adresse);
    const mapSize = '600x400';
    const zoomLevel = 15;
    mapImageUrl.value = `https://maps.googleapis.com/maps/api/staticmap?center=${address}&size=${mapSize}&zoom=${zoomLevel}&markers=color:red|${address}&key=${apiKey}`;
  } catch (error) {
    console.error('Error fetching company details:', error);
  }
  // Using Js native method to format the date without a timestamp
 try  {
    const dateCreation = new Date(companyDetails.value.date_creation);
    formattedDate.value = dateCreation.toLocaleDateString('fr-FR'); 
  } catch (error) {
    console.error('Error fetching company details:', error);
  }
});
 

  </script>
  