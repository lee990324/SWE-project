<template>

  
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username">Username:</label>
      <input type="text" v-model="user.username" id="username" required>
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
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.user);
      this.user.username = '';
      this.user.password = '';
    }
  }
}
</script>

<style scoped>
/* 스타일 정의 */
</style>
