<template>
    <div class="form-container">
      <!-- 로그인 폼 -->
      <form v-if="!showRegisterForm" @submit.prevent="onLogin">
        <div class="input-group">
          <label for="username">사용자명</label>
          <input type="text" id="username" v-model="credentials.username" required>
        </div>
        <div class="input-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="credentials.password" required>
        </div>
        <button type="submit" class="btn btn-primary">로그인</button>
      </form>
  
      <!-- 회원가입 폼 -->
      <form v-else @submit.prevent="onRegister">
        <div class="input-group">
          <label for="newUsername">사용자명</label>
          <input type="text" id="newUsername" v-model="newCredentials.username" required>
        </div>
        <div class="input-group">
          <label for="newPassword">비밀번호</label>
          <input type="password" id="newPassword" v-model="newCredentials.password" required>
        </div>
        <div class="input-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="newCredentials.email" required>
        </div>
        <button type="submit" class="btn btn-success">회원가입</button>
      </form>
  
      <button @click="toggleForm">
        {{ showRegisterForm ? '로그인하기' : '회원가입' }}
      </button>
    
      <!-- Google 로그인 버튼 -->
      <div class="g-signin2" data-onsuccess="onGoogleSignIn"></div>

      <!-- Facebook 로그인 버튼 -->
    <fb:login-button
      scope="public_profile,email"
      onlogin="checkLoginState();">
    </fb:login-button>

    </div>
</template>
  
  <script>
  /* eslint-disable no-undef */

  export default {
    data() {
      return {
        showRegisterForm: false,
        credentials: {
          username: '',
          password: ''
        },
        newCredentials: {
          username: '',
          password: '',
          email: ''
        },
        users: []
      };
    },
    methods: {
      
    onLogin() {
        console.log(this.$router);
        // 사용자 정보 확인
        const user = JSON.parse(localStorage.getItem(this.credentials.username));
        if (user && user.password === this.credentials.password) {
          // 로그인 성공 시 홈 화면으로 이동
          this.$router.push({ name: 'homepage' });
        } else {
          // 실패 시 알림
          alert('잘못된 사용자명 또는 비밀번호입니다.');
        }
      },
    onRegister() {
        // 새로운 사용자 정보 저장
        const newUser = {
          username: this.newCredentials.username,
          password: this.newCredentials.password,
          email: this.newCredentials.email
        };
        // 회원가입 후 로그인 폼으로 전환
        localStorage.setItem(newUser.username, JSON.stringify(newUser));
        this.showRegisterForm = false;
        // 회원가입 성공 알림
        alert('회원가입이 완료되었습니다. 로그인해 주세요.');
      },
    
      toggleForm() {
        this.showRegisterForm = !this.showRegisterForm;
      },
      onGoogleSignIn(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      // 로그인 성공 후 필요한 로직 추가
      },
      checkLoginState() {
      FB.getLoginStatus((response) => {
        this.statusChangeCallback(response);
      });
     },
      statusChangeCallback(response) {
        if (response.status === 'connected') {
          FB.api('/me', { fields: 'name, email' }, (response) => {
            console.log('Good to see you, ' + response.name);
            console.log('Email: ' + response.email);
            // 로그인 성공 후 필요한 로직 추가
          });
        } else {
          console.log('User not authenticated.');
        }
      },
      authenticate(provider) {
      this.$auth.authenticate(provider).then(() => {
        // 인증 후 홈 페이지로 리다이렉션
        this.$router.push({ name: 'homepage' });
      }).catch((error) => {
        // 오류 처리
        console.error('Authentication failed', error);
      });
      }
    }
  };

  // 글로벌 스크립트 함수 설정
window.onGoogleSignIn = function(googleUser) {
  const vueInstance = document.getElementById('app').__vue__;
  vueInstance.$children[0].onGoogleSignIn(googleUser);
};

window.checkLoginState = function() {
  const vueInstance = document.getElementById('app').__vue__;
  vueInstance.$children[0].checkLoginState();
};
  </script>
  
  <style scoped>
  </style>
  
  
  <style scoped>
  .form-container {
    max-width: 300px;
    margin: auto;
  }
  
  .input-group {
    margin-bottom: 1em;
  }
  
  .input-group label {
    display: block;
  }
  
  .input-group input {
    width: 100%;
    padding: 0.5em;
  }
  
  .btn {
    width: 100%;
    padding: 0.5em;
    border: none;
    margin-top: 1em;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-success {
    background-color: #28a745;
    color: white;
  } 
  .sns-login-button {
    margin-top: 10px; 
    background-color: gray;
    color: white;
  }
  
  .link-container {
    margin-top: 1em;
    text-align: center;
  }
  
  .link-container a {
    color: #007bff;
    text-decoration: none;
  }
  
  .link-container a:hover {
    text-decoration: underline;
  }
  </style>
  
  