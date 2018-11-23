import Vue from 'vue'
import App from './App.vue'
import VEditor from '../../src/index.js'

Vue.use(VEditor, {
  name: 'v-editor-app',
  config: {},
  uploadHandler: (type, resTxt) => {
    if (type === 'success') {
      var res = JSON.parse(resTxt)
      if (res.status !== 1) {
        return null
      }
      return res.data.fileUrl
    } else if (type === 'error') {
      //todo toast
    } else if (type === 'timeout') {
      //todo toast
    }
    return '上传失败__'
  }
})
new Vue({
  el: '#app',
  render: h => h(App)
})
