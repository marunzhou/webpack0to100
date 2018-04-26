import indexCss from './css/index.css';
import sasstest from './sass/sasstest.scss';

import Vue from 'vue';
import App from './App.vue';



document.getElementById('testApp') && new Vue({
  el: '#testApp',
  template: '<App />',
  components: { App }
})