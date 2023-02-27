import { createStore } from 'vuex'
import axios from "axios";
import router from "@/router";
// Create a new store instance.
const store = createStore({
    state: function () {
        return {
            isAuthenticated: localStorage.getItem('token')?true:false,
            token: localStorage.getItem('token')||''
        }
    },
    getters:{
        isAutenticated: state =>{
            return localStorage.getItem('token')?true:false
        },
        authToken: state =>{
            return state.token
        }
    },
    mutations: {
        setToken(state, token){
            localStorage.setItem('token', token)
        }
    },
    actions: {
        login({commit}, user){
            axios.post('/login', user).then(function (response){
                let res = response.data
                if(res.code != 401){
                    localStorage.setItem('token',  res.access_token)
                    commit('setToken', res.access_token)
                    router.go('/users');
                }else{
                    alert('Username or Password Didn\'t match')
                }
                    
            });
        },
        logout({commit}, user){
            localStorage.removeItem('token');
            router.go('/login');
        }
    }
})

export default store;