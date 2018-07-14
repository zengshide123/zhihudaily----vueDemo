// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './index.css'



new Vue({
        el:'#app',
        render:h=>{
          return h(App)
        }
})