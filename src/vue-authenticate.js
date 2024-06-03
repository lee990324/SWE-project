import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueAuthenticate from 'vue-authenticate';

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:4000', // 후에 백엔드 서버 부여 필요
  providers: {
    google: {
      clientId: 'Google Client ID',
      redirectUri: 'https://localhost:8080/login'
    },
    facebook: {
      clientId: 'Facebook App ID',
      redirectUri: 'https://localhost:8080/login' 
    }
  }
});
