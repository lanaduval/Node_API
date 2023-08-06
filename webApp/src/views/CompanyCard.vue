<template >

<n-space vertical>
    <n-input size="large" round v-model:value="searchQuery" @update:value="searchQuery" @input="performSearch" />
    <p>Search Query: {{ searchQuery }}</p>
    <n-button type="primary" ghost @click="performSearch">
        Search
      </n-button>
  </n-space>

  <div v-for="company in displayedCompanies" :key="company.id" >
    
    <div v-if="company.nom_raison_sociale">
  <n-card :title="company.nom_raison_sociale" >
    <template #cover>
      <img src="https://picsum.photos/200?company">

    </template>
  Adress : {{ company.geo_adresse }} <br>
 
  <router-link :to="{ name: 'CompanyDetails', params: { id: company.id } }">
  <n-button type="primary" ghost>
    Details
  </n-button>
  </router-link>

  <n-button type="primary" ghost @click="generatePDF(company.id)">
      PDF
    </n-button>

  </n-card>
 
</div>

</div>

 <!-- Pagination Controls -->


    <n-pagination v-model:page="currentPage" :page-count="totalPages" @update:page="onPageChange" />

</template>

<style scoped>
.n-card {
  max-width: 300px;
}


</style>


<script setup>
import { ref, computed, onMounted, watch} from 'vue';
import axios from 'axios';

const currentPage = ref(1);
const companies = ref([]); // Array to store fetched companies data
const itemsPerPage = 10; // Number of items to display per page
const searchQuery = ref('');




// Fetch companies data and populate the companies array
const fetchCompanies = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/companies', {
      params: {
        name: searchQuery.value
      },
    });
    companies.value = response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
};

// Computed property to calculate the total number of pages
const totalPages = computed(() => Math.ceil(companies.value.length / itemsPerPage));

// Computed property to get the companies data for the current page
const displayedCompanies = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return companies.value.slice(startIndex, endIndex);
});

// Fetch initial companies data on component mount
onMounted(() => {
  fetchCompanies();
});

// Handle page change event from n-pagination
const onPageChange = (newPage) => {
  currentPage.value = newPage;
};

const performSearch = () => {
  console.log('performSearch called');
  currentPage.value = 1;
  fetchCompanies();
};


watch(searchQuery, () => {
  console.log('searchQuery changed:', searchQuery.value);
  currentPage.value = 1;
  fetchCompanies();
});



// Function to generate the PDF using the API route

const generatePDF = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5001/api/companies/generate-pdf/${id}`, {
      responseType: 'blob',
    });
    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};



</script>


