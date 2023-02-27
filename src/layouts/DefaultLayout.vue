<template>
<div class="container">
  <nav class="navbar navbar-expand-lg bg-light fixed-top">
  <div class="container">
    <a class="navbar-brand" href="#">Leaping Logic Assignment</a>
    
  <!-- <nav class="navbar"> -->
      <button class="btn btn-outline-danger my-2 my-sm-0 float-right" type="button" v-on:click="logout">Logout</button>
  </div>
</nav>
    <!-- Create Main section -->
    <div class="top-space"></div>
    <div class="row mx-1 px-5 pb-3 w-80">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
    name: 'DefaultLayout',

  methods: {
      logout: function (){
        this.$store.dispatch('logout')
      }
  }
}
</script>

<style>
.top-space {
  margin-top: 80px;
}
</style>