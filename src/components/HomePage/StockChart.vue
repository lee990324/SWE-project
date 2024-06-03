<template>
    <div class="stock-chart">
      <h2>코스피 & 코스닥 차트</h2>
      <!-- 차트 라이브러리 통합 부분 -->
      <!--<canvas id="stockChart"></canvas>-->
    </div>
  </template>
  
  <script>
  export default {
    name: 'StockChart',
    /*mounted() {
    this.fetchStockData();
  },
  methods: {
    fetchStockData() {
      const apiUrl = 'YOUR_API_URL'; // API URL
      axios.get(apiUrl)
        .then(response => {
          const data = response.data; // 데이터 처리
          this.renderChart(data);
        })
        .catch(error => console.error('Error fetching stock data:', error));
    },
    renderChart(data) {
      const ctx = document.getElementById('stockChart').getContext('2d');
      new Chart(ctx, {
        type: 'line', // 차트 타입
        data: {
          labels: data.labels, // X축 데이터
          datasets: [{
            label: 'KOSPI',
            data: data.values, // Y축 데이터
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    }
  }*/
  }
  </script>
  
  <style>
  .stock-chart {
    margin-top: 20px;
  }
  </style>
  