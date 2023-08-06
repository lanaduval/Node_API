<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import CompanyCard from './CompanyCard.vue';

export default defineComponent({
  components: {
    CompanyCard,
  },
  setup() {
    const companies = ref([]);

    // Fonction pour charger les données des entreprises depuis le backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/companies'); // Remplacez l'URL par celle de votre backend
        companies.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Chargez les données des entreprises lors du montage du composant
    onMounted(() => {
      fetchData();
    });

    return {
      companies,
    };
  },
});
</script>

<style>
/* Ajoutez ici votre style personnalisé si nécessaire */
</style>
