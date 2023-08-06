import { createRouter, createWebHistory } from 'vue-router'
import CompanyCard from '../views/CompanyCard.vue'
import CompanyDetails from '../views/CompanyDetails.vue'
import AppLayout from '../AppLayout.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'CompanyCard',
        component: CompanyCard,
      },
      {
        path: 'api/companies/:id',
        name: 'CompanyDetails',
        component: CompanyDetails,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
