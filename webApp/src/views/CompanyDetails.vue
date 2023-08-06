<template>
    <div>
        <n-space vertical>
        <n-card :title="companyDetails.nom_raison_sociale" >
            <template #cover>
                <img :src="mapImageUrl" alt="Company Location" />
      <p>Address: {{ companyDetails.geo_adresse }}</p>

        <p>Since: {{ companyDetails.date_creation }}</p>
        <p>SIREN: {{ companyDetails.siren }}</p>
    </template>
        </n-card>

      <router-link :to="{ name: 'CompanyCard'}">

  <n-button type="primary" ghost>
    Back
  </n-button>
</router-link>
</n-space>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { NCard, NSpace } from 'naive-ui';

  const route = useRoute();
  const companyId = route.params.id; // Access the ID from the route params

const companyDetails = ref([]);
const mapImageUrl = ref('');

  
  
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

});
  </script>
  