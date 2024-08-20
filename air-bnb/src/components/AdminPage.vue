<template>
  <div class="homepage">
    <button @click.prevent="openLogin" id="logout">LogOut</button>
    <h2>Add New Campsite</h2>
    <form @submit.prevent="AddCampsite()">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="campsite.name" placeholder="Enter campsite name" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="campsite.description" placeholder="Enter campsite description"
          required></textarea>
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="campsite.location" placeholder="Enter campsite location" required />
      </div>
      <div class="form-group">
        <label for="imageLink">Image Link:</label>
        <input type="url" id="imageLink" v-model="campsite.imageLink" placeholder="Enter image URL" required />
      </div>
      <div class="form-group">
        <label for="pricePerDay">Price per Day:</label>
        <input type="number" id="pricePerDay" v-model="campsite.pricePerDay" placeholder="Enter price per day"
          required />
      </div>
      <button type="submit">Add Campsite</button>
      <button @click="resetForm()">Reset</button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </form>
    <!-- Main Content -->
    <div class="main-content">
      <h2>Explore Camping Spots</h2>
      <div class="camping-spots">
        <div class="spot" v-for="spot in campingSpots" :key="spot.id">
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
export default {
  name: "AdminPage",
  data() {
    return {
      campingSpots: [],   // Array to store camping spots
      campsite: {
        name: '',
        description: '',
        location: '',
        imageLink: '',
        pricePerDay: 0
      },
      errorMessage: '',
      successMessage: ''
    };
  },
  mounted() {
    if (JSON.parse(localStorage.getItem('isAdmin')) != true) {
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
    async AddCampsite() {
      try {
        const response = await axios.post('https://localhost:5001/Admin/Campsite', {
          name: this.campsite.name,
          description: this.campsite.description,
          location: this.campsite.location,
          imageLink: this.campsite.imageLink,
          pricePerDay: this.campsite.pricePerDay
        })
        if (response.status == 200) {
          this.refreshPage();
        }
      }
      catch (error) {
        console.error('There was an error creating the user:', error);
      }
    },
    resetForm() {
      this.campsite = {
        name: '',
        description: '',
        location: '',
        imageLink: '',
        pricePerDay: 0
      };
    },
    refreshPage() {
      window.location.reload();
    },
    openLogin() {
      // Remove user data from localStorage
      localStorage.removeItem('isAdmin');
      this.$router.push({ path: '/' });
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

.admin-homepage {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 20%;
  padding: 8px;
  box-sizing: border-box;
}

form {
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  justify-content: center;
}

.error-message {
  color: red;
}

.success-message {
  color: green;
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