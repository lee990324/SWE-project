<template>
  <div class="home">
    <h1>Stock Market Dashboard</h1>
    <div>
      <canvas id="kospiChart"></canvas>
      <canvas id="kosdaqChart"></canvas>
    </div>
    <h1>User Management</h1>
    <UserForm @submit="handleUserSubmit" />
    <h1>Stock Management</h1>
    <StockForm @submit="handleStockSubmit" />
    <StockList :stocks="stocks" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import UserForm from '../components/UserForm.vue';
import StockForm from '../components/StockForm.vue';
import StockList from '../components/StockList.vue';

Chart.register(...registerables);

export default {
  components: {
    UserForm,
    StockForm,
    StockList
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
      stocks: []
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
      this.user = user;
      // Optional: Save user to localStorage or perform other actions
    },
    handleStockSubmit(stock) {
      this.stocks.push({ ...stock, currentPrice: null });
    },
    checkLoginStatus() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.user = user;
      }
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
