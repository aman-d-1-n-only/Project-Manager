<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
export default {
  name: 'App',
  components:{
    //Es6 feature using Navbar in place of Navbar(name we given at the time of importing):Navbar(name with what we want to use it here)
    Navbar,
  }
}
</script>

<style>

</style>
