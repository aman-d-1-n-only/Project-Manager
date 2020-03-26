<template>
    <div class="index container">
      <div class="card" v-for="project in projects" :key="project.id">
          <div class="card-content">
            <i class="material-icons delete" @click="deleteProject(project.id)">delete</i>
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
//importing the database here
import db from "@/Firebase/init"

export default {
  name: 'Index',
  data () {
    return {
    projects:[
      
    ]
    }
  },
  methods:{
    deleteProject(id){
      
      db.collection("projects").doc(id).delete()
      .then(() => {
      this.projects=this.projects.filter(project => {
        return project.id != id
        })
      })
    }
  },

  //created hook present when everything is created before rendering
  created(){
    
    //to fetch the data before it is created
   db.collection('projects').get()
   .then(snapshot => {
     //snapshot will contain all the document we want to have 
     snapshot.forEach(doc => {
      let project =doc.data()
          project.id =doc.id
          this.projects.push(project)
     })
   })
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
.index .delete{
  position: absolute;
  top:4px;
  right:4px;
  cursor:pointer;
  color:grey;
  font-size:1.4em;
}
</style>
