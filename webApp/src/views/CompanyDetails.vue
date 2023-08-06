<template>
    <div>
        <n-space vertical>
        <n-card :title="companyDetails.nom_raison_sociale" >
            <template #cover>
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


  
  
onMounted(async () => {

    console.log(companyId);
    
  try {
    const response = await axios.get(`http://localhost:5001/api/companies/${companyId}`);
    companyDetails.value = response.data;
    console.log(companyDetails.value);
    console.log(companyDetails.value.nom_raison_sociale);
  } catch (error) {
    console.error('Error fetching company details:', error);
  }

});
  </script>
  