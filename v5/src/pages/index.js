import indexCss from './css/index.css';
import sasstest from './sass/sasstest.scss';

import Vue from 'vue';
import App from './App.vue';

window.onload = function() {
  var div = document.createElement('div');
  div.id = 'app';
  document.body.appendChild(div);

  new Vue({
    el: '#app',
    template: '<App />',
    components: { App }
  })
}