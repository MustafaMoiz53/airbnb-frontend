<template>
  <div>
    <!-- Navigation Bar -->
    <NavigationBar />
    <div class="booking-page">
      <div v-if="spot" class="spot-details">
        <h2>{{ spot.name }}</h2>
        <img :src="spot.imageLink" :alt="spot.name" class="spot-image" />
        <p>{{ spot.description }}</p>
        <p class="price">Price per night: €{{ spot.pricePerDay }}</p>
        <p id="location">Location: {{ spot.location }}</p>
      </div>

      <!-- Booking Form -->
      <div class="booking-form">
        <h3>Book Your Stay</h3>
        <form @submit.prevent="submitBooking">
          <div class="form-group">
            <label for="checkin">Check-in Date:</label>
            <input type="date" id="checkin" v-model="booking.checkin" required />
          </div>
          <div class="form-group">
            <label for="checkout">Check-out Date:</label>
            <input type="date" id="checkout" v-model="booking.checkout" required />
          </div>
          <button type="submit" @click.prevent="checkAvailability()">Book Now</button>
        </form>
      </div>


      <!-- Display Existing Remarks -->
      <div class="remarks-section">
        <h3>Remarks</h3>
        <div v-if="remarks.length">
          <div v-for="remark in remarks" :key="remark.id" class="remark-item">
            <!-- <p><strong>Rating:</strong> {{ remark.rating }} / 5</p> -->
            <p>{{ remark.description }}</p>
          </div>
        </div>
        <div v-else>
          <p>No remarks yet. Be the first to leave a remark!</p>
        </div>
      </div>


      <!-- Remark Form -->
      <div class="remark-form">
        <h3>Leave a Remark</h3>
        <form @submit.prevent="submitRemark">
          <div class="form-group">
            <label for="remarkText">Your Remark:</label>
            <textarea id="remarkText" v-model="remark.description" rows="5" required></textarea>
          </div>
          <button type="submit">Submit Remark</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavigationBar from './NavigationBar.vue';
export default {
  name: 'BookingPage',
  components: {
    NavigationBar,
  },
  data() {
    return {
      spot: null, // To store the fetched spot details
      booking: {
        checkin: '',
        checkout: ''
      },
      remark: {
        description: ''
      },
      isAvailable: true,
      suggestedDates: null,
      remarks: [] // Store existing remarks
    };
  },
  props: ['spotId'], // Receiving spotId as a prop
  mounted() {
    if(localStorage.getItem('user') == null && JSON.parse(localStorage.getItem('isAdmin')) != true){
      this.$router.push({ path: '/' });
    }
    this.fetchSpotDetails();
    this.fetchRemarks();
  },
  methods: {
    async fetchSpotDetails() {
      try {
        const response = await axios.get(`https://localhost:5001/Camp/${this.spotId}`);
        this.spot = response.data; // Store the fetched spot details
      } catch (error) {
        console.error('Error fetching spot details:', error);
      }
    },
    async checkAvailability() {
      try {
        const response = await axios.get('https://localhost:5001/Book/CheckAvailability', {
          params: {
            campID: this.spot.id,
            startDate: this.booking.checkin,
            endDate: this.booking.checkout
          }
        });
        this.isAvailable = response.data;

        if (!this.isAvailable) {
          alert('The spot is not available for the selected dates. Please choose different dates.');
          this.suggestAlternativeDates();
        } else {
          this.submitBooking();
        }
      } catch (error) {
        console.error('Error checking availability:', error);
      }
    },
    async submitBooking() {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id; // Get user ID from local storage
        const bookingData = {
          campID: this.spot.id,
          userID: userId,
          startDate: this.booking.checkin,
          endDate: this.booking.checkout
        };

        const response = await axios.post('https://localhost:5001/Book', bookingData);

        if (response.status === 200) {
          alert('Booking successfully submitted!');
        }
      } catch (error) {
        console.error('Error submitting booking:', error);
      }
    },
    async fetchRemarks() {
      try {
        const response = await axios.get(`https://localhost:5001/Remarks/Remarks/CampID?campid=${this.spotId}`);
        this.remarks = response.data;
        console.log(this.remarks)
      } catch (error) {
        console.error('Error fetching remarks:', error);
      }
    },
    async submitRemark() {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const remarkData = {
          campID: this.spot.id,
          userID: userId,
          description: this.remark.description
        };

        const response = await axios.post('https://localhost:5001/Remarks', remarkData);

        if (response.status === 200) {
          alert('Remark successfully submitted!');
          this.refreshPage();
        }
      } catch (error) {
        console.error('Error submitting remark:', error);
      }
    },
    refreshPage() {
      window.location.reload();
    }
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f2f2f2;
}

.booking-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.spot-details {
  text-align: center;
}

.spot-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

.price {
  font-weight: bold;
  color: #2e7d32;
  /* Use the green color for the price to make it stand out */
  font-size: 18px;
  margin-bottom: 20px;
}

.booking-form {
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.booking-form h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #27672b;
}

.remark-form {
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.remark-form h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.remark-form textarea {
  resize: vertical;
}

.remark-form button {
  background-color: #2e7d32;
}

.remark-form button:hover {
  background-color: #27672b;
}

#location {
  margin-top: -10px;
  margin-bottom: 0px;
}

h3 {
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>