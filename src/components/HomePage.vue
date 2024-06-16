<template>
  <div class="home">
    <h1>Stock Market Dashboard</h1>
    <div>
      <canvas id="kospiChart"></canvas>
      <canvas id="kosdaqChart"></canvas>
    </div>
    <h1>User Management</h1>
    <UserForm @submit="handleUserSubmit" v-if="!isLoggedIn" />
    <div v-if="isLoggedIn">
      <p>Welcome, {{ user.username }}!</p>
      <button @click="logout">Logout</button>
    </div>
    <h1>Coin Management</h1>
    <CoinForm @submit="handleCoinSubmit" />
    <CoinList :coins="coins" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import UserForm from '../components/UserForm.vue';
import CoinForm from '../components/CoinForm.vue';
import CoinList from '../components/CoinList.vue';

Chart.register(...registerables);

export default {
  components: {
    UserForm,
    CoinForm,
    CoinList
  },
  data() {
    return {
      kospiChart: null,
      kosdaqChart: null,
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        kospiData: [2900, 2910, 2920, 2930, 2940, 2950],
        kosdaqData: [950, 955, 960, 965, 970, 975]
      },
      user: {
        username: '',
        password: ''
      },
      coins: [],
      isLoggedIn: false
    };
  },
  mounted() {
    this.initializeKospiChart();
    this.initializeKosdaqChart();
    this.checkLoginStatus();
  },
  methods: {
    initializeKospiChart() {
      const ctx = document.getElementById('kospiChart').getContext('2d');
      this.kospiChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'KOSPI Index',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            data: this.chartData.kospiData,
            fill: false,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    },
    initializeKosdaqChart() {
      const ctx = document.getElementById('kosdaqChart').getContext('2d');
      this.kosdaqChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'KOSDAQ Index',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            data: this.chartData.kosdaqData,
            fill: false,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    },
    handleUserSubmit(user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
      this.isLoggedIn = true;
    },
    handleCoinSubmit(coin) {
      this.coins.push({ ...coin, currentPrice: null });
      this.$forceUpdate();
    },
    checkLoginStatus() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.user = user;
        this.isLoggedIn = true;
      }
    },
    logout() {
      localStorage.removeItem('user');
      this.user = { username: '', password: '' };
      this.isLoggedIn = false;
    }
  }
};
</script>

<style>
.home {
  max-width: 800px;
  margin: auto;
  text-align: center;
}
canvas {
  display: block;
  margin: 20px auto;
}
</style>
