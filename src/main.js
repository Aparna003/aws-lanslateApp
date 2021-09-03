import Vue from 'vue'
import App from './App.vue'

import {BootstrapVue} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Amplify, * as AmplifyModules from "aws-amplify";
import {AmazonAIPredictionsProvider} from "@aws-amplify/predictions";
import awsconfig from "./aws-exports";


Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

Vue.use(AmplifyModules);
Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
