<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    window.addEventListener('pagehide', () => {
      sessionStorage.removeItem('userRole')
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('userId')
    })
  }
}
</script>

<style>
</style>