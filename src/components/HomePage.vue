<template>
  <div class="home">
    <h1>Stock Market Dashboard</h1>
    <div>
        <canvas id="stockChart"></canvas>
        <p v-if="dataFetchError" style="color: red;">Error fetching stock data: {{ dataFetchError }}</p>
    </div>
    <h1>Coin Management</h1>
    <UserForm @submit="handleUserSubmit" />
    <CoinForm @submit="handleCoinSubmit" />
    <CoinList :coins="coins" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // 날짜 어댑터를 가져옵니다.
import axios from 'axios';
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
      stockChart: null,
      symbol: "AAPL", // 예시로 Apple 주식 사용
      apiKey: "jz376NF6voi0taiu4m1GxcUbpVMzyZvu", // API 키
      coins: [],
      user: {
        id: '',
        password: ''
      },
      dataFetchError: null
    };
  },
  mounted() {
    this.initializeStockChart();
    this.fetchCoins();
  },
  methods: {
    async initializeStockChart() {
      const url = `https://financialmodelingprep.com/api/v3/historical-chart/1min/${this.symbol}?apikey=${this.apiKey}`;
      try {
        const response = await axios.get(url);
        if (!response.data || response.data.length === 0) {
          this.dataFetchError = "No data available";
          return;
        }
        const labels = response.data.map(data => data.date);
        const openPrices = response.data.map(data => data.open);
        this.renderChart(labels, openPrices);
      } catch (error) {
        this.dataFetchError = error.toString();
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
    async handleUserSubmit(user) {
        try {
            await axios.post('http://localhost:3000/api/users', user);
            this.user = { id: '', password: '' }; // Reset form
        } catch (error) {
            console.error('Error submitting user:', error);
        }
    },
    async handleCoinSubmit(coin) {
        try {
            await axios.post('http://localhost:3000/api/coins', coin);
            this.coins.push({ ...coin, currentPrice: null }); // Add to list
        } catch (error) {
            console.error('Error submitting coin:', error);
        }
    },
    async fetchCoins() {
        try {
            const response = await axios.get('http://localhost:3000/api/coins');
            this.coins = response.data.map(coin => ({ ...coin, currentPrice: null })); // Initialize price
        } catch (error) {
            console.error('Error fetching coins:', error);
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
