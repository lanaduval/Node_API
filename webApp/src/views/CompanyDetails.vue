<template>
    <div>
      <h1>{{ companyDetails.nom_raison_sociale }}</h1>
      <p>Address: {{ companyDetails.geo_adresse }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const companyId = route.params.id; // Access the ID from the route params

const companyDetails = ref({});


  
  
onMounted(async () => {

    console.log(companyId);
  try {
    const response = await axios.get(`http://localhost:5001/api/companies/${companyId}`);
    companyDetails.value = response.data;
  } catch (error) {
    console.error('Error fetching company details:', error);
  }
});
  </script>
  