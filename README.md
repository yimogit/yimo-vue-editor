# yimo-vue-editor

Demo address: https://vue-editor.yimo.link/example/html/index.html

> Vue-editor component based on wangeditor2.5.11 wrapper
> wangEditor docs：https://www.kancloud.cn/wangfupeng/wangeditor2/113961

## Used in vue projects

`npm install yimo-vue-editor --save`

```
<template>
  <yimo-vue-editor v-model="text></yimo-vue-editor>
</template>

import YimoVueEditor from 'yimo-vue-editor'
export default {
  components: {
    YimoVueEditor
  }
}
```

## Global introduction and configuration

``` js
import YimoVueEditor from 'yimo-vue-editor'

Vue.use(YimoVueEditor, {
  name: 'v-editor-app',//Custom name
  config: {
    uploadImgUrl:'/api/upload', // upload api
    printLog: false, // disabled console.log
    lang: YimoVueEditor.E.langs.en // lang config
  },//wagnEditor config
  uploadHandler: (type, resTxt) => {//Upload processing hook
    if (type === 'success') {
      var res = JSON.parse(resTxt)//Do not process the default look at the return value bit image path
      if (res.status !== 1) {
        return null
      }
      return res.data
    } else if (type === 'error') {
      //todo toast
    } else if (type === 'timeout') {
      //todo toast
    }
    return 'upload failed__'
  }
})
```

## Parameter

- value
  v-model Binding editor value
- config
  wangEditor2.0  config ，[wangEditor docs](https://www.kancloud.cn/wangfupeng/wangeditor2/113975)
- uploadHandler
  The processing of the return value after the image is uploaded, successfully returns the url to be inserted, fails to return an error prompt or prompts in the hook, etc.
  ```js
  var uploadHandler = (type, resTxt) => {
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
    return 'upload failed__'
  }
  ```

## Modification

- delete Map menu code
- hide Emoticon menu
- fix Upload multiple image insertion order issues (replace after tag placement)
- add Link open state setting
- add Hook after uploading
- add upload append filename no null


## Points to pay attention to

- ie9 upload image, upload using form+iframe, can't cross domain, and the return type needs to be text/html
- The log is printed as a global parameter, subject to the last setting
