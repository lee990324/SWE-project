<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="id">User ID:</label>
      <input type="text" v-model="user.id" id="id" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" v-model="user.password" id="password" required>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.user);
      this.user.id = '';
      this.user.password = '';
    }
  }
}
</script>

<style scoped>
/* 스타일 정의 */
</style>
