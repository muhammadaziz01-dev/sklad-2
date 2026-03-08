<template>
  <div id="app">
    <!-- Shu yerda router-view barcha sahifalarni ko'rsatadi -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Oddiy styling */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

input {
  margin: 5px 0;
  padding: 5px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
