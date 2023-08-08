
<!---------------- TEMPLATE NCARD GALLERY : ALL CARDS ----->
<template >
<n-space horizontal justify="start">
    <n-h1 > Répertoire d'entreprises </n-h1>
  </n-space>


  <n-space horizontal justify="start">
    <n-input size="large" hoverable round v-model:value="searchQuery" @update:value="searchQuery" @input="performSearch" placeholder="Recherche par nom"/>
    <n-button type="primary" ghost @click="performSearch">
      Search
    </n-button>
  </n-space>


 
    <div class="cardsGallery">

 <!--- FETCHING DATAS FROM MY LOCALE API AND MAPPING IT-->     
 <div v-for="(company, index) in displayedCompanies" :key="index">
        
        <div v-if="company.nom_raison_sociale">
      <n-space justify="space-between" size="small">
  <n-card :title="company.nom_raison_sociale" hoverable v-if="company.nom_raison_sociale">
    <template #cover>
     
     <img :src="getImageUrl(index)" alt={{company.nom_raison_sociale}} />
    </template>
  Adress : {{ company.geo_adresse }} <br>

<template #action>
  <router-link :to="{ name: 'CompanyDetails', params: { id: company.id } }">
  
  <!--- BUTTONS CTA -->  
    <n-button type="primary" ghost>
    Details
  </n-button>
  </router-link>

  <n-button type="primary" ghost @click="generatePDF(company.id)">
      PDF
    </n-button>
  </template>
  </n-card>
  </n-space>

 
</div>
</div>

</div>



<!-- Pagination Controls -->

<n-space horizontal justify="center">
    <n-pagination v-model:page="currentPage" :page-count="totalPages" @update:page="onPageChange" />
  </n-space>
</template>

<!--- STYLE TO CUSTOMIZE MY NAIVE UI COMPONENTS -->  
<style scoped>
.n-card {
  width: 20rem;
  height:30rem;
  padding:0.5rem;
 background-color: rgba(219, 218, 226, 0.063);
}

.n-card img {
  height:15rem;
}

.cardsGallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  justify-content: center;
  grid-gap: 20px;
  margin : 1rem 1rem 1rem 0rem;

}



.n-pagination {
  margin-bottom: 2rem;
}

.n-button {
  margin: 0.25rem;
  &:hover {
    background-color: hsla(160, 38%, 61%, 0.103);
  }
}
.n-h1 {
  margin: 2rem 0rem 2rem 0rem;;
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: 1rem;
  border: 0.1rem solid rgb(155, 152, 152);
  border-radius: 1rem;
}
</style>

<!----------------- SCRIPT------------------>  
<script setup>
import { ref, computed, onMounted, watch} from 'vue';
import instance from '../axios/axios.js';

const currentPage = ref(1);
const companies = ref([]); // Array to store fetched companies data
const itemsPerPage = 10; // Number of items to display per page
const searchQuery = ref('');


// Function to get the image URL from Picsum using the index
const getImageUrl = (index) => {
  const imageIndex = (currentPage.value - 1) * itemsPerPage + index + 1;
  return `https://picsum.photos/seed/${imageIndex}/400`;
};


// Fetch companies data and populate the companies array
const fetchCompanies = async () => {
  try {
    const response = await instance.get(`${import.meta.env.VITE_BACKEND_URL}/api/companies`, {
      params: {
        name: searchQuery.value
      },
    });
    companies.value = response.data.filter(company => company.nom_raison_sociale !== null && company.nom_raison_sociale.trim() !== '');
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
  fetchCompanies(); // Fetch companies data for the new page
};


// Even to fetch companies datas when the search query changes
const performSearch = () => {
  //console.log('performSearch called');
  currentPage.value = 1;
  fetchCompanies();
};


watch(searchQuery, () => {
  //console.log('searchQuery changed:', searchQuery.value);
  currentPage.value = 1;
  fetchCompanies();
});



// Function to generate the PDF using the API route

const generatePDF = async (id) => {
  try {
    const response = await instance.get(`http://localhost:5001/api/companies/generate-pdf/${id}`, {
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


