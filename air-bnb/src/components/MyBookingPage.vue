<template>
    <div>
        <!-- Navigation Bar -->
        <NavigationBar />

        <!-- My Bookings Section -->
        <div class="my-bookings">
            <h1>My Bookings</h1>
            <div v-if="bookings.length">
                <div v-for="booking in bookingsWithDetails" :key="booking.id" class="booking-item">
                    <img :src="booking.camp.imageLink" :alt="booking.camp.name" class="camp-image" />
                    <div @click.prevent="openBookingPage(booking.camp.id)" class="booking-details">
                        <h2>{{ booking.camp.name }}</h2>
                        <p>Start Date: {{ booking.startDate }}</p>
                        <p>End Date: {{ booking.endDate }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>No bookings found.</p>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import axios from 'axios';
export default {
    name: "MyBookingPage",
    components: {
        NavigationBar,
    },
    data() {
        return {
            bookings: [], // To store the bookings data
            bookingsWithDetails: [] // To store bookings with campsite details
        };
    },
    mounted() {
        if (localStorage.getItem('user') == null) {
            this.$router.push({ path: '/' });
        }
        this.fetchBookings();
    },
    methods: {
        async fetchBookings() {
            try {
                const userId = JSON.parse(localStorage.getItem('user')).id; // Get user ID from local storage
                const response = await axios.get(`https://localhost:5001/Book/Bookings/UserID?userID=${userId}`);
                this.bookings = response.data; // Store the fetched bookings

                // Fetch campsite details for each booking
                for (let booking of this.bookings) {
                    const campResponse = await axios.get(`https://localhost:5001/Camp/${booking.campID}`);
                    this.bookingsWithDetails.push({
                        ...booking,
                        camp: campResponse.data
                    });
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        },
        openBookingPage(spotId) {
            this.$router.push({ path: `/booking/${spotId}` });
        },
    }

}
</script>

<style scoped>
.my-bookings {
    padding: 20px;
}

.booking-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.booking-details {
    cursor: pointer;
}

.camp-image {
    width: 400px;
    height: 400px;
    object-fit: cover;
    margin-right: 20px;
}

.booking-details {
    flex-grow: 1;
}
</style>
