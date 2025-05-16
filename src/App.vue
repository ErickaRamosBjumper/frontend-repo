/* eslint-disable */
<template>
  <div id="app">
    <h1>Lista de Usuarios</h1>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.username }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      users: [],
      loading: true,
      error: null
    }
  },
  async created() {
    try {
      const { data } = await axios.get('/api/users/')
      this.users = data.results
      this.loading = false
    } catch (error) {
      this.error = error.message
      this.loading = false
    }
  }
}
</script>

<style>
#app {
  max-width: 600px;
  margin: 20px auto;
  font-family: sans-serif;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
