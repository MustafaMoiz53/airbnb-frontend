<template>
  <div class="homepage">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Main Content -->
    <div class="main-content">
      <h2>Explore Camping Spots</h2>
      <div class="camping-spots">
        <div class="spot" v-for="spot in campingSpots" :key="spot.id" @click="openBookingPage(spot.id)">
          <img :src="spot.imageLink" :alt="spot.name" class="spot-image" />
          <h3>{{ spot.name }}</h3>
          <p>{{ spot.description }}</p>
          <p class="price">Price per night: €{{ spot.pricePerDay }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
import NavigationBar from './NavigationBar.vue';
export default {
  name: "HomePage",
  data() {
    return {
      campingSpots: [],   // Array to store camping spots
    };
  },
  components: {
    NavigationBar,
  },
  mounted() {
    if(localStorage.getItem('user') == null){
      this.$router.push({ path: '/' });
    }
    this.fetchCampingSpots();
  },
  methods: {
    // Method to fetch camping spots data
    async fetchCampingSpots() {
        try {
          const response = await axios.get('https://localhost:5001/Camp');
          this.campingSpots = response.data;  // Assign the response data to campingSpots
        } catch (error) {
          console.error('Error fetching camping spots:', error);
        }
      },
      // Method to navigate to booking page
      openBookingPage(spotId) {
        this.$router.push({ path: `/booking/${spotId}` });
      },

  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f2f2f2;
}


.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
  color: #333;
}

.camping-spots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.spot {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
  cursor: pointer;
}

.spot:hover {
  transform: translateY(-5px);
}

.spot-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.spot h3 {
  padding: 15px;
  margin: 0;
  font-size: 24px;
  color: #333;
}

.spot p {
  padding: 0 15px 15px;
  margin: 0;
  color: #666;
  font-size: 16px;
}

/* New styling for the price */
.price {
  padding: 0 15px 15px;
  margin: 0;
  font-weight: bold;
  color: #2e7d32;
  /* Use the green color for the price to make it stand out */
  font-size: 18px;
}
</style>
