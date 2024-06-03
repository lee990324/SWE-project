<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
 
  },
  mounted(){
    if (this.$route.name !== 'login') {
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style>
/* 전역 기본 설정 */
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #808080;
}

/* 컨테이너 스타일링 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 버튼 기본 스타일 */
button {
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #449d44;
}

/* 링크 - 텍스트 강조 스타일링 */
a {
  color: #0275d8;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* 텍스트 입력 필드 기본 스타일 */
input[type="text"], input[type="password"] {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* 오류 메시지 스타일 */
.error {
  color: red;
  font-size: 14px;
}

/* 성공 메시지 스타일 */
.success {
  color: green;
  font-size: 14px;
}
</style>


