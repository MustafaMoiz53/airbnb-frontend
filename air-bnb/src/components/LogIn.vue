<template>
  <div class="login-container">
    <h2>{{ isAdmin ? 'Admin Login' : 'User Login' }}</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="userEmail" placeholder="Enter your email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <button type="submit" id="login">Login</button>
      <button type="reset" class="reset-btn">Reset</button>
      <button type="button" @click="toggleLoginType">
        Switch to {{ isAdmin ? 'User' : 'Admin' }} Login
      </button>
      <button type="button" @click="SignUpOpen">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      isAdmin: false, // Track whether the login is for admin or user
      userID: null,
      userEmail: "",
      password: "",
      errorMessage: '', // To store and display the error message
    };
  },
  methods: {
    async authentication() {
      try {
        const url = this.isAdmin 
          ?`https://localhost:5001/Admin/Authentication?email=${this.userEmail}&password=${this.password}`
          :`https://localhost:5001/User/Authentication?email=${this.userEmail}&password=${this.password}`;

        const response = await axios.get(url);
        console.log(response.data);
        
        if(response.status == 200 && this.isAdmin){
          this.HomePageOpen();
          localStorage.setItem('isAdmin', JSON.stringify(true));
        }
        else if (response.data > 0) {
          this.userID = response.data;
          this.fetchUserData();
        } else {
          this.errorMessage = 'Incorrect username or password.';
        }
      } catch (error) {
        console.error('There was an error during authentication:', error);
      }
    },
    async fetchUserData() {
      if (this.userID) {
        const url = `https://localhost:5001/User/${this.userID}`;
        
        axios.get(url)
          .then(response => {
            const user = response.data; // Assuming API returns the user data in response.data
            localStorage.setItem('user', JSON.stringify(user));
            this.HomePageOpen();
            console.log('User data fetched successfully:', user);
          })
          .catch(error => {
            console.error('There was an error fetching the user data:', error);
          });
      } else {
        console.error('No user ID found');
        this.$router.push('/'); // Redirect to login if no user ID found
      }
    },
    HomePageOpen() {
      if (this.isAdmin) {
        this.$router.push('/adminpage');
      } else {
        this.$router.push('/homepage');
      }
    },
    SignUpOpen() {
      this.$router.push({ path: "/signup" });
    },
    handleLogin() {
      if (this.userEmail !== "" && this.password !== "") {
        this.authentication();
      } else {
        this.errorMessage = "Please fill in both fields.";
      }
    },
    toggleLoginType() {
      this.isAdmin = !this.isAdmin;
      this.userEmail = "";
      this.password = "";
      this.errorMessage = "";
    }
  }
};
</script>




<style scoped>
/* Add styles for the login container and form */
.login-container {
  max-width: 400px;
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
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  margin-right: 10px;
}
.error-message {
  color: red;
}
body {
  background: linear-gradient(120deg, #a6c0fe, #f68084);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-container {
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
  background: linear-gradient(145deg, #6a11cb, #2575fc);
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

button:hover {
  background: linear-gradient(145deg, #2575fc, #6a11cb);
}

.reset-btn {
  background-color: #f44336;
}

.reset-btn:hover {
  background-color: #c0392b;
}

#admin-log {
  margin-top: 20px;
  display: flex;
}

#admin-log input {
  width: 15px;
}
</style>
