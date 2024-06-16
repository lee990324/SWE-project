<template>
  <div>
    <h2>Stock List</h2>
    <ul>
      <li v-for="(stock, index) in stocks" :key="index">
        {{ stock.symbol }}
        <button @click="fetchStockPrice(stock.symbol)">Fetch Current Price</button>
        <span v-if="stock.currentPrice"> - Current Price: {{ stock.currentPrice }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    stocks: {
      type: Array,
      required: true
    }
  },
  methods: {
    async fetchStockPrice(stockSymbol) {
      const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
      try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol: stockSymbol,
            apikey: apiKey
          }
        });
        const price = response.data['Global Quote']['05. price'];
        const stock = this.stocks.find(s => s.symbol === stockSymbol);
        if (stock) {
          this.$set(stock, 'currentPrice', price);
        }
      } catch (error) {
        console.error('Error fetching stock price:', error);
      }
    }
  }
}
</script>

<style scoped>
/* 스타일 정의 */
</style>
