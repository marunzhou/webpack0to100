import indexCss from './css/index.css';

import Vue from 'vue';
import App from './App.vue';



document.getElementById('testApp') && new Vue({
  el: '#testApp',
  template: '<App />',
  components: { App }
})