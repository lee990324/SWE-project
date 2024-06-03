<template>
    <div class="home">
      <h1>금융시장 대시보드</h1>
      <stock-chart />
      <realtime-rank />
      <live-comments />
    </div>
  </template>
  
  <script>
  import StockChart from '@/components/HomePage/StockChart.vue'
  import RealtimeRank from '@/components/HomePage/RealtimeRank.vue'
  import LiveComments from '@/components/HomePage/LiveComments.vue'
  
  export default {
    components: {
      StockChart,
      RealtimeRank,
      LiveComments
    }
  }
  </script>
  
  <style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  