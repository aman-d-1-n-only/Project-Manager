import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddProject from "@/components/AddProject"

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: "/add-project",
            name: "AddProject",
            component: AddProject

        }
    ]
})