import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'  // 경로 확인 필요
import LoginForm from '@/components/LoginForm.vue'  // 경로 확인 필요
import MyPage from '@/components/MyPage.vue'  // 경로 확인 필요
import FavoritePage from '@/components/FavoritePage.vue'  // 경로 확인 필요

const router = createRouter({
  history: createWebHistory(),  // HTML5 History 모드
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/home',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/myPage',
      name: 'MyPage',
      component: MyPage
    },
    {
      path: '/favoritePage',
      name: 'FavoritePage',
      component: FavoritePage
    }
  ],
  
})


export default router;

