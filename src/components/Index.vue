<template>
    <div class="index container">
      <!--Making a div that is card and iterate it for each project in projects collection in db-->
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
          <span class="btn-floating btn-large halfway-fab pink">
            <router-link :to="{name:'EditProject',params:{project_slug:project.slug}}">
              <i class="material-icons edit">
                edit
              </i>
            </router-link>
          </span>
      </div>    
  </div>
</template>

<script>
//importing the database from init.js where we export our firestore db
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
      //this will delete the project on database immediately but it will not show it deleted on frontend of index.vue bcz it show 
      //the data it has grabbed at the time of created hook.it will delete it on frontend after we reload and make the created hook again
      .then(() => {
      //so here we have to filter out the projects on frontend too seprately so that it will be deleted immmediately on frontend
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
     //means it contain how many document we have in our collection in firestore database
     snapshot.forEach(doc => {

          let project =doc.data()
              project.id =doc.id
           //to push project from database we extracted to projects array to show on frontend 
           //as we are iterating the element of this array in template 
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
