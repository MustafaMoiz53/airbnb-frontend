<template>
  <nav class="navbar">
    <h1 class="logo" @click.prevent="openHomepage">CampSpot</h1>
    <ul class="nav-links">
      <li><a href="#" @click.prevent="openHomepage">Home</a></li>
      <li><a href="#" @click.prevent="openUserInfo">User Information</a></li>
      <li><a href="#" @click.prevent="openBookings">My Bookings</a></li>
      <li><a href="#" @click.prevent="openReviews">My Reviews</a></li>
      <li><a href="#" @click.prevent="openLogin">Log Out</a></li>

    </ul>
  </nav>
</template>

<script>

export default {
  name: "NavigationBar",
  methods: {
    openUserInfo() {
      this.$router.push({ path: '/user-info' });
    },
    openBookings() {
      this.$router.push({ path: '/myBookings' });
    },
    openReviews() {
      this.$router.push({ path: '/myReviews' });
    },
    openHomepage() {
      this.$router.push({ path: '/homepage' });
    },
    openLogin() {
      // Remove user data from localStorage
      localStorage.removeItem('user');
      this.$router.push({ path: '/' });
    },
  }
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px 20px;
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0 15px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>