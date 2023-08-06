<!-- AppLayout.vue -->
<template>
    <div>
      <!-- Header or any other common components can go here -->
  
      <!-- The <router-view /> will render the appropriate component based on the route -->
      <router-view></router-view>
  
      <!-- Footer or any other common components can go here -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppLayout',
  };
  </script>
  