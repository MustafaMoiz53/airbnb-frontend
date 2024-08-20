<template>
    <div>
        <!-- Navigation Bar -->
        <NavigationBar />

        <!-- My Remarks Section -->
        <div class="my-remarks">
            <h1>My Remarks</h1>
            <div v-if="remarks.length">
                <div v-for="remark in remarksWithDetails" :key="remark.id" class="remark-item">
                    <img :src="remark.camp.imageLink" :alt="remark.camp.name" class="camp-image" />
                    <div @click.prevent="openRemarkPage(remark.camp.id)" class="remark-details">
                        <h2>{{ remark.camp.name }}</h2>
                        <p>Review: {{ remark.description }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>No remarks found.</p>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import axios from 'axios';
export default {
    name: "MyRemarkPage",
    components: {
        NavigationBar,
    },
    data() {
        return {
            remarks: [], // To store the remarks data
            remarksWithDetails: [] // To store remarks with campsite details
        };
    },
    mounted() {
        if(localStorage.getItem('user') == null){
      this.$router.push({ path: '/' });
    }
        this.fetchRemarks();
    },
    methods: {
        async fetchRemarks() {
            try {
                const userId = JSON.parse(localStorage.getItem('user')).id; // Get user ID from local storage
                const response = await axios.get(`https://localhost:5001/Remarks/Remarks/UserID?userID=${userId}`);
                this.remarks = response.data; // Store the fetched remarks

                // Fetch campsite details for each remark
                for (let remark of this.remarks) {
                    const campResponse = await axios.get(`https://localhost:5001/Camp/${remark.campID}`);
                    this.remarksWithDetails.push({
                        ...remark,
                        camp: campResponse.data
                    });
                }
            } catch (error) {
                console.error('Error fetching remarks:', error);
            }
        },
        openRemarkPage(spotId) {
        this.$router.push({ path: `/remark/${spotId}` });
      },
    }

}
</script>

<style scoped>
.my-remarks {
    padding: 20px;
}

.remark-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.remark-details{
    cursor: pointer;
}

.camp-image {
    width: 400px;
    height: 400px;
    object-fit: cover;
    margin-right: 20px;
}

.remark-details {
    flex-grow: 1;
}
</style>
