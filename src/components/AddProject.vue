<template>
    <div class="add-project container">
     <h2 class="center-align green-text">Add New Project</h2>
     <form @submit.prevent="addStack">
         <div class="field title">
             <label for="title">Project Name</label>
             <input type="text" name="title" v-model="title">
         </div>
         <div class="field  add-stack">
             <label for="add-stack">Enter the stack</label>
             <input type="text" name="add-stack" @keydown.tab.prevent="Adding" v-model="another"/>
         </div>
         <div class="field center-align">
             <p v-if="feedback" class="red-text">{{feedback}}</p>
             <button class="btn pink">ADD PROJECT</button> 

         </div>
     </form>
    </div>
</template>


<script>
export default {
    name:"AddProject",
    data(){
        return{
            title:null,
            another:null,
            stacks:[],
            feedback:null,

        }
    },
    methods:{
        addStack(){
            //console.log(this.title)
        },
        Adding(){
            if(this.another){
                this.stacks.push(this.another)
                this.another=null
                this.feedback=null
            }else{
                this.feedback="You must enter a value to add an stack"
            }
        }
    }
}
</script>

<style >
.add-project{
    margin-top:60px;
    padding: 20px;
    max-width:500px;
}
.add-project h2 {
    font-size:2em;
    margin:20px auto;
}
.add-project .field{
    margin:20px auto;
}

</style>