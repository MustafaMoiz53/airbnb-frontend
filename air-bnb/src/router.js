import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/HomePage.vue';
import LogIn from './components/LogIn.vue';
import SignUp from './components/SignUp.vue';
import BookingPage from './components/BookingPage.vue';
import User from './components/UserInfo.vue';
import MyBookingPage from './components/MyBookingPage.vue';
import MyReviewsPage from './components/MyReviewsPage.vue';
import AdminPage from './components/AdminPage.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name:'LogIn',
      component:LogIn
    },
    {
      path:'/homepage',
      name:'HomePage',
      component:HomePage
    },
    {
      path:'/adminpage',
      name:'adminpage',
      component:AdminPage
    },
    {
      path:'/signup',
      name:'SignUp',
      component: SignUp
    },
    {
      path: '/booking/:spotId', // Dynamic route for booking page
      name: 'BookingPage',
      component: BookingPage,
      props:true // Pass the route parameters as props to the component
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      component:User
    },
    {
      path: '/myBookings',
      name: 'MyBookingPage',
      component:MyBookingPage
    },
    {
      path: '/myReviews',
      name: 'MyReviewsPage',
      component:MyReviewsPage
    }
  ]
});
