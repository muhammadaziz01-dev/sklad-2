<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <nav>
      <router-link to="/dashboard">Home</router-link> |
      <router-link to="/dashboard/settings">Settings</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage'
};
</script>