<template>
  <div id="app">
    <div>
      <h3>实例切换：{{caseType}}</h3>
      <button @click="caseType=item" v-for="item in ['单个','多个']" :key="item">{{item}}</button>
    </div>
    <div v-if="caseType==='单个'" key="case1">
      <h3>单个编辑器：v-editor</h3>
      <v-editor v-model="editorObj.singleTxt" :config="{printLog:false, uploadImgUrl: '/mockserver/api/upload?isIe9=' + isIe9}" />
      <h3>单个编辑器：v-editor-app</h3>
      <v-editor-app v-model="editorObj.singleTxt" :config="{printLog:false, uploadImgUrl: '/mockserver/api/upload?isIe9=' + isIe9}" />
      <div>预览：</div>
      <textarea style="width:100%;height:300px;" v-model="editorObj.singleTxt"></textarea>
    </div>
    <div v-if="caseType==='多个'" key="case2">
      <div v-for="(item,index) in editorObj.arrayTxt" :key="'e_'+index">
        <h3>编辑器{{index+1}}：</h3>
        <div :key="'eidtor2_'+index">
          <v-editor v-model="item.msg" :key="'eidtor_'+index" :config="uploadConfig"></v-editor>
        </div>
        <div>预览编辑器{{index+1}}：</div>
        <textarea style="width:100%;height:300px;" v-model="item.msg"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
var isIe9 = window.navigator.userAgent.indexOf('MSIE 9.0') > 0
import VEditor from '../../src/Editor'

export default {
  name: 'app',
  components: {
    VEditor
  },
  data() {
    return {
      isIe9: isIe9,
      uploadConfig: {
        printLog: false,
        uploadImgUrl: '/mockserver/api/upload?isIe9=' + isIe9
      },
      caseType: '单个', //单个 多个
      editorObj: {
        singleTxt: 'Welcome to Your Vue.js App',
        singleTxt2: 'Welcome to Your Vue.js App',
        arrayTxt: [{ msg: '<p>aa</p>' }, { msg: '<p>bb</p>' }]
      }
    }
  },
  methods: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
