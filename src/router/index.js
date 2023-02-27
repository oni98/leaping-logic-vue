import { createWebHistory, createRouter } from 'vue-router';

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout"
import AuthLayout from "@/layouts/AuthLayout"

// users
import UserList from "@/components/users/UserList"

import ForgotPassword from "@/components/auth/ForgotPassword"
import Register from "@/components/auth/Register"
import Login from "@/components/auth/Login"
//middlewares
import nextFactory from "@/middleware/pipeline";
import auth from "@/middleware/auth";
import checkAuth from "@/middleware/checkAuth";
window.auth = auth;
window.checkAuth = checkAuth;

//Stores
import store from "@/store/index";

const routes = [
    {
        path: '/users',
        component: DefaultLayout,
        meta: {
            middleware: ['auth']
        },
        children:[
            {
                path: '/users',
                component: UserList,
                name:'ListUser',
            }
        ]
    },

    {
        path: '/login',
        component: AuthLayout,
        meta: {
            middleware: ['checkAuth']
        },
        children: [
            {
                path: '/login',
                component: Login,
                name:'Login'
            },
            {
                path: '/register',
                component: Register,
                name:'Register'
            },
            {
                path: '/forgot-password',
                component: ForgotPassword,
                name:'ForgotPassword'
            }

        ]
    },

    { path: "/:pathMatch(.*)*", redirect: "/users" },
];

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes,
});





//Restricted area. not permitted to change or delete
router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
        const context = {
            from,
            next,
            router,
            to,
            store
        }
        const nextMiddleware = nextFactory(context, middleware, 1);
        return window[middleware[0]]({ context, next: nextMiddleware });
    }

    return next();
})
export default router;