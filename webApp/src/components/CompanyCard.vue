<template>
  <div v-for="company in displayedCompanies" :key="company.id">
  <n-card :title="company.nom_raison_sociale" >
    <template #cover>
      <img src="https://picsum.photos/200?company">
    </template>
  Adress : {{ company.geo_adresse }} <br>
  Since : {{ company.date_creation }} <br>
  SIREN : {{ company.siren }} <br>

  </n-card>
</div>

 <!-- Pagination Controls -->
<div>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>

</template>

<style scoped>
.n-card {
  max-width: 300px;
}

</style>
<script>git 
import axios from 'axios';
export default {
  data() {
    return {
      companies: [], // Array to store fetched companies data
      itemsPerPage: 10, // Number of items to display per page
      currentPage: 1, // Current page number
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.companies.length / this.itemsPerPage);
    },
    displayedCompanies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.companies.slice(startIndex, endIndex);
    },
  },
  async created() {

    try {
      const response = await axios.get('http://localhost:5001/api/companies'); 
      this.companies = response.data;
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>







