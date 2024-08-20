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
    <div @click.prevent=openLogin id="login_btn">
      <P>Back to Login</P>
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
          email: this.password,
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
  background: linear-gradient(120deg, #f093fb, #f5576c);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.signup-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  box-shadow: 20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
}

h2 {
  text-align: center;
  color: #333;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #444;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f7f7f7;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #f093fb, #f5576c);
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

button:hover {
  background: linear-gradient(145deg, #f5576c, #f093fb);
}

#login_btn {
  cursor: pointer;
  text-align: center;
}
</style>