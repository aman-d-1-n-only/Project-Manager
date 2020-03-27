<template>
    <div  v-if="project" class="edit-project container">
        <h2>Edit {{project.title}}  Project</h2>
         <form @submit.prevent="editProject">
         <div class="field title">
             <label for="title">Project Name</label>
             <input type="text" name="title" v-model="project.title">
         </div>
         <!--to show the added stack in stacks-->
         <div  class="field" v-for="(stack,index) in project.stacks" :key="index">
           <!--outputing here the input field so that user can edit it later on-->
           <label for="stack">Stack:</label>  
           <!--In this two way binding value shown is stack with current iterating index-->
           <input type="text" name="stack" v-model="project.stacks[index]">
           <!--Add a delete button for deleting stack-->
           <i class="material-icons delete" @click="deleteStack(stack)">delete</i>
         </div>

         <div class="field  add-stack">
             <label for="add-stack">Enter the stack</label>
             <!--here user will enter the stack then as two way binded with another by default it is null
              but as user input it will be updated to new value by two way binding -->
             <input type="text" name="add-stack" @keydown.tab.prevent="Adding" v-model="another"/>
         </div>
         <div class="field center-align">
             <!--Showing the feedback msg-->
             <p v-if="feedback" class="red-text">{{feedback}}</p>
             <!--Submit button-->
             <button class="btn pink">UPDATE PROJECT</button> 

         </div>
     </form>
    </div>
</template>

<script>
import db from "@/Firebase/init"
import slugify from "slugify"
export default {
    name:"EditProject",
    data() {
        return{
        project:null,
        another:null,
        feedback:null,
        slug:null
        }
    },
    methods:{
        editProject(){
               if(this.project.title){
                this.feedback=null
                //creating a slug(what we want to slugify, function how we want to slugify)
                this.slug =slugify(this.project.title,{
                   replacement:"-",
                   remove:/[$*_+`.()'"!\-:@]/g,
                   lower:true
                })

                db.collection("projects").doc(this.project.id).update({
          title: this.project.title,
          slug: this.slug,
          ingredients: this.project.stacks
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => {
          console.log(err)
        })

            }else{
                this.feedback="You must enter a project name"
            }
        },
         Adding(){
            if(this.another){
                this.project.stacks.push(this.another)
                //we make another null again to make it empty so that we can store information on it again
                this.another=null
                //if after making another empty if we have fill the another then not to show this message by keeping this empty
                this.feedback=null
            }else{
                //to show a warning msg
                this.feedback="You must enter a value to add an stack"
            }
        },
        //deleting the stack
        deleteStack(stack){
            this.project.stacks=this.project.stacks.filter(stackElement => {
                return stackElement != stack 
            })
        }
    },
    //grabbing the data of project
    created(){
        
        let ref = db.collection("projects").where('slug','==',this.$route.params.project_slug)
        ref.get()
         .then(snapshot => {
             snapshot.forEach(doc => {
                this.project = doc.data()
                this.project.id = doc.id
             })
         })
    }
}
</script>

<style >
.edit-project{
    margin-top:60px;
    padding: 20px;
    max-width:500px;
}
.edit-project h2 {
    font-size:2em;
    margin:20px auto;
}
.edit-project .field{
    margin:20px auto;
    position:relative;
}
.edit-project .delete {
    position:absolute;
    right:0;
    color:grey;
    font-size: 1.4em;
    cursor: pointer;
}
</style> 

