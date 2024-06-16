<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="stock">Stock Symbol:</label>
      <input type="text" v-model="stock.symbol" id="stock" required>
    </div>
    <button type="submit">Add Stock</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      stock: {
        symbol: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.stock);
      this.stock.symbol = '';
    }
  }
}
</script>

<style scoped>
/* 스타일 정의 */
</style>
