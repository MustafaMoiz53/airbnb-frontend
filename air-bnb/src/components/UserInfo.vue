<template>
  <div>
    <!-- Navigation Bar -->
    <NavigationBar />
    <div class="user-info">
      <h2>User Information</h2>
      <form @submit.prevent="updateUserInfo">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input type="number" id="age" v-model="user.age" />
        </div>
        <button type="submit">Update Information</button>
      </form>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import NavigationBar from './NavigationBar.vue';
export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        id: null,
        name: '',
        email: '',
        password:"",
        age: null
      }
    };
  },
  mounted(){
    if(localStorage.getItem('user') == null){
      this.$router.push({ path: '/' });
    }
    this.fetchUserInfo()
  },
  components:{
    NavigationBar,
  },
  methods: {
    fetchUserInfo() {
      const userData = JSON.parse(localStorage.getItem('user'));
      console.log(userData)
      this.user.id = userData.id;
      this.user.name = userData.name;
      this.user.password = userData.password;
      this.user.age = userData.age;
      this.user.email = userData.email;
    },
    async updateUserInfo() {
      try {
        const response = await axios.put(`https://localhost:5001/User/${this.user.id}`, {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          age: this.user.age
        })
        if( response.status == 200){
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      }
      catch (error) {
        console.error('There was an error creating the user:', error);
      }
    },
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.user-info {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  /* Slightly transparent white */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  /* Add a slight blur to the background */
  position: relative;
  z-index: 1;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: #2e7d32;
  /* Nature-inspired green */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2e7d32;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  /* Slightly transparent input background */
}

button {
  width: 100%;
  padding: 12px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #388e3c;
  /* Darker green on hover */
}

/* Background image for the page */
body {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

::selection {
  background: #2e7d32;
  /* Highlight color when selecting text */
  color: #fff;
}

@media (max-width: 600px) {
  .user-info {
    width: 90%;
    margin: 20px auto;
    padding: 15px;
  }

  h2 {
    font-size: 24px;
  }

  button {
    font-size: 16px;
  }
}
</style>
