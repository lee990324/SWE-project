<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="coin">Coin:</label>
      <input type="text" v-model="coin.name" id="coin" required>
    </div>
    <div>
      <label for="price">Price:</label>
      <input type="number" v-model="coin.price" id="price" required>
    </div>
    <button type="submit">Add Coin</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      coin: {
        name: '',
        price: 0
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.coin);
      this.coin.name = '';
      this.coin.price = 0;
    }
  }
}
</script>

<style scoped>
/* 스타일 정의 */
</style>
