<template>
    <div class="index container">
      <div class="card" v-for="project in projects" :key="project.id">
          <div class="card-content">
            <h2 class="green-text">{{project.title}}</h2>
              <ul class="stacks">
                <li v-for="(stack,index) in project.stacks" :key="index">
                  <span class="chip"> {{stack}}</span>
                </li>

              </ul>
          </div>
      </div>    
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    projects:[
      {title:"Freelance India",slug:"freelanceIndia",stacks:["Vue.js","Firebase","Git-lab"],id:'1'},
      {title:"Veg Works",slug:"vegWorks",stacks:["Solidity","React","node.js"],id:'2'}
    ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

.index {
  display : grid;
  grid-template-columns: 1fr 1fr 1fr ;
  grid-gap:30px;
  margin-top:60px;

}
.index h2{
  font-size:1.8em;
  text-align:center;
  margin-top:0;
}
.index .stacks {
  margin:30px auto;
}
.index .stacks li{
  display:inline-block;
}

</style>
