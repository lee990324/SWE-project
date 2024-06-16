<template>
  <div>
    <h2>Coin List</h2>
    <ul>
      <li v-for="(coin, index) in coins" :key="index">
        {{ coin.name }}: {{ coin.price }}
        <button @click="fetchCoinPrice(coin.name)">Fetch Current Price</button>
        <span v-if="coin.currentPrice"> - Current Price: {{ coin.currentPrice }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    coins: {
      type: Array,
      required: true
    }
  },
  methods: {
    async fetchCoinPrice(coinName) {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
          params: {
            ids: coinName.toLowerCase(),
            vs_currencies: 'usd'
          }
        });
        const price = response.data[coinName.toLowerCase()].usd;
        const coin = this.coins.find(c => c.name.toLowerCase() === coinName.toLowerCase());
        if (coin) {
          this.$set(coin, 'currentPrice', price);
        }
      } catch (error) {
        console.error('Error fetching coin price:', error);
      }
    }
  }
}
</script>

<style scoped>
/* 스타일 정의 */
</style>
