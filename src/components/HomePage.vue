<template>
  <div class="home">
    <h1>Stock Market Dashboard</h1>
    <div>
      <canvas id="stockChart"></canvas>
    </div>
    <h1 id = "title">User Management</h1>
    <UserForm @submit="handleUserSubmit" />
    <h1 id = "title">Stock Management</h1>
    <StockForm @submit="handleStockSubmit" />
    <StockList :stocks="stocks" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // 날짜 어댑터를 가져옵니다.
import axios from 'axios';
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
      stockChart: null,
      symbol: "AAPL", // 예시로 Apple 주식 사용
      apiKey: "jz376NF6voi0taiu4m1GxcUbpVMzyZvu", // API 키
      user: {
        username: '',
        password: ''
      },
      stocks: []
    };
  },
  mounted() {
    this.initializeStockChart();
    this.checkLoginStatus();
  },
  methods: {
    async initializeStockChart() {
      const url = `https://financialmodelingprep.com/api/v3/historical-chart/1min/${this.symbol}?apikey=${this.apiKey}`;
      try {
        const response = await axios.get(url);
        if (!response.data || response.data.length === 0) {
          console.error("No data available");
          return;
        }
        const labels = response.data.map(data => data.date);
        const openPrices = response.data.map(data => data.open);
        this.renderChart(labels, openPrices);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    },
    renderChart(labels, prices) {
      const ctx = document.getElementById('stockChart').getContext('2d');
      if (this.stockChart) {
        this.stockChart.destroy(); // 기존 차트가 있으면 제거
      }
      this.stockChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `${this.symbol} Open Prices`,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            data: prices,
            fill: false,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                parser: 'yyyy-MM-dd HH:mm:ss',
                tooltipFormat: 'll HH:mm'
              }
            },
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
      this.stocks.push({ ...stock, currentPrice: null }); // Add to the stocks array
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
#title{
 width: 800px; 
} 
</style>
