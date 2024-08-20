<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignUp">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" placeholder="Choose a username" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input type="number" id="age" v-model="age" placeholder="Enter your age" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Create a password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm your password"
          required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <div @click.prevent="openLogin" id="login_btn">
      <p>Back to Login</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      age: null,
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    async createUser() {
      try {
        const response = await axios.post('https://localhost:5001/User', {
          name: this.username,
          email: this.email,
          password: this.password,
          age: this.age
        })
        if( response.status == 200){
          this.$router.push({ path: '/' });
        }
      }
      catch (error) {
        console.error('There was an error creating the user:', error);
      }
    },
    handleSignUp() {
      // Basic validation logic or API call
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      this.createUser();
    },

    openLogin() {
      this.$router.push({ path: '/' });
    },
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdug5UYte7qy1r2le8t8DweKJDNTjZ_9kINw&s') no-repeat center center fixed;
  background-size: cover;
}

.signup-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

h2 {
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #34495e;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ecf0f1;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #27ae60, #2ecc71);
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: linear-gradient(145deg, #2ecc71, #27ae60);
}

#login_btn {
  cursor: pointer;
  text-align: center;
  color: #2980b9;
  font-weight: bold;
}
</style>
