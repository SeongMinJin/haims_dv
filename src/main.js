import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firebase-database'
import 'firebase/firebase-storage'
import 'firebase/firebase-firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD-qMHr_46RqMTwxKMx5BZhrMZTe9H06JY',
  authDomain: 'haims-dv.firebaseapp.com',
  databaseURL: 'https://haims-dv-default-rtdb.firebaseio.com',
  projectId: 'haims-dv',
  storageBucket: 'haims-dv.appspot.com',
  messagingSenderId: '992120289669',
  appId: '1:992120289669:web:b4484896eb941cf5d92cec',
  measurementId: 'G-HR2LWQELNJ'
}
Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
