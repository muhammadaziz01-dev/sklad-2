<template>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error" style="color:red">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const name = ref('');
      const password = ref('');
      const error = ref('');
  
      const handleLogin = () => {
        if (name.value === 'admin' && password.value === '1234') {
          error.value = '';
          router.push('/dashboard');
        } else {
          error.value = 'Incorrect name or password';
        }
      };
  
      return { name, password, handleLogin, error };
    }
  };
  </script>