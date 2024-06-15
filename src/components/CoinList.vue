<template>
  <div>
    <h2>Coin List</h2>
    <ul>
      <li v-for="(coin, index) in coins" :key="index">
        {{ coin.name }}: {{ coin.price }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    coins: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
/* 스타일 정의 */
</style>
