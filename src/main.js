// 필요한 모듈을 임포트
import { createApp } from 'vue'
import App from './App.vue'  // 루트 컴포넌트
import router from './router'  // 라우터 인스턴스

// Vue 애플리케이션 생성
const app = createApp(App);

// 라우터를 사용하도록 설정 router/index.js
app.use(router);

// 전역으로 사용할 컴포넌트나 플러그인 추가

// Vue 인스턴스를 HTML 내의 특정 요소에 마운트
app.mount('#app');
